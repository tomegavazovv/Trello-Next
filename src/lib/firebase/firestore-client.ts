import { Task, TaskColumns, TaskInput } from '@/types/task';
import { db } from './firebaseConfig';
import { collection, doc, updateDoc, deleteDoc, getDocs, serverTimestamp, writeBatch, getDoc, query, where, setDoc, addDoc } from 'firebase/firestore';
import { Column } from '@/types/column';

const TASKS_COLLECTION = 'tasks';
const COLUMNS_COLLECTION = 'columns';

export const firestoreClient = {
  saveTask: async (userId: string, task: TaskInput): Promise<Task> => {
    const newTask = {
      ...task,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, TASKS_COLLECTION), newTask);
    return { id: docRef.id, ...newTask } as Task;
  },

  generateTaskId: (): string => {
    return doc(collection(db, TASKS_COLLECTION)).id;
  },

  updateTask: async (task: Task): Promise<void> => {
    const taskRef = doc(db, TASKS_COLLECTION, task.id);
    await updateDoc(taskRef, {
      ...task,
      updatedAt: serverTimestamp()
    });
  },

  deleteTask: async (taskId: string): Promise<void> => {
    console.log('deleting task from db')
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
  },

  getTasks: async (userId: string): Promise<Task[]> => {
    const tasksSnapshot = await getDocs(query(collection(db, TASKS_COLLECTION), where('userId', '==', userId)));

    return tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Task[];
  },

  updateTasksOrder: async (updatedTasks: Task[]): Promise<void> => {
    const batch = writeBatch(db);
    updatedTasks.forEach(task => {
      const taskRef = doc(db, TASKS_COLLECTION, task.id);
      batch.update(taskRef, {
        order: task.order,
        updatedAt: serverTimestamp()
      });
    });
    await batch.commit();
  },

  updateTaskColumn: async (taskId: string, newColumnId: string, order: number): Promise<Task> => {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      columnId: newColumnId,
      order,
      updatedAt: serverTimestamp()
    });
    const updatedTask = await getDoc(taskRef);
    return { id: taskId, ...updatedTask.data() } as Task;
  },

  getColumns: async (userId: string): Promise<Column[]> => {
    const userDoc = await getDoc(doc(db, COLUMNS_COLLECTION, userId));
    if (userDoc.exists()) {
      console.log(userDoc.data().columns)
      return userDoc.data().columns || [];
    }
    return [];
  },

  updateColumns: async (userId: string, columns: Column[]): Promise<void> => {
    await setDoc(doc(db, COLUMNS_COLLECTION, userId), { columns }, { merge: true });
  },

  saveColumn: async (userId: string, columnName: string): Promise<Column> => {
    const columns = await firestoreClient.getColumns(userId);
    const newColumn = {
      title: columnName,
      order: columns.length + 1,
      id: doc(collection(db, COLUMNS_COLLECTION)).id
    };
    columns.push(newColumn);
    await firestoreClient.updateColumns(userId, columns);
    return newColumn;
  },

  deleteColumn: async (userId: string, columnId: string): Promise<void> => {
    let columns = await firestoreClient.getColumns(userId);
    columns = columns.filter((col: Column) => col.id !== columnId);
    await firestoreClient.updateColumns(userId, columns);

    // Delete all tasks in this column
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(tasksRef, where('userId', '==', userId), where('columnId', '==', columnId));
    const tasksSnapshot = await getDocs(q);
    const batch = writeBatch(db);
    tasksSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  },

  renameColumn: async (userId: string, columnId: string, newName: string): Promise<void> => {
    const columns = await firestoreClient.getColumns(userId);
    const columnIndex = columns.findIndex((col: Column) => col.id === columnId);
    if (columnIndex !== -1) {
      columns[columnIndex].title = newName;
      await firestoreClient.updateColumns(userId, columns);
    }
  }
};