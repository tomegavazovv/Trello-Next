import { db } from '../../lib/firebaseConfig';
import { collection, deleteDoc, doc, updateDoc, getDocs, serverTimestamp, writeBatch, getDoc, query, where, setDoc } from 'firebase/firestore';
import { Task, TaskColumns } from '@/components/board/types';
import { Column, TaskInput } from '@/components/board/Column/types';

const TASKS_COLLECTION = 'tasks';
const COLUMNS_COLLECTION = 'columns';

class FirebaseTaskRepository {
    saveTask = async (userId: string, task: TaskInput): Promise<Task> => {
        const newTask: Task = {
            ...task,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        await setDoc(doc(db, TASKS_COLLECTION, newTask.id), newTask);
        return newTask;
    }

    generateTaskId(): string {
        return doc(collection(db, TASKS_COLLECTION)).id;
    }

    updateTask = async (task: Task): Promise<void> => {
        const taskRef = doc(db, TASKS_COLLECTION, task.id);
        await updateDoc(taskRef, {
            ...task,
            updatedAt: serverTimestamp()
        });
    }

    deleteTask = async (taskId: string): Promise<void> => {
        await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    }

    getTasks = async (userId: string): Promise<TaskColumns> => {
        const [columns, tasksSnapshot] = await Promise.all([
            this.getColumns(userId),
            getDocs(query(collection(db, TASKS_COLLECTION), where('userId', '==', userId)))
        ]);

        const tasks: TaskColumns = {};

        columns.forEach(column => {
            tasks[column.id] = {
                title: column.name,
                tasks: [],
                id: column.id
            };
        });

        tasksSnapshot.forEach(doc => {
            const task = { id: doc.id, ...doc.data() } as Task;
            if (task.columnId in tasks) {
                tasks[task.columnId].tasks.push(task);
            }
        });

        return tasks;
    }

    updateTasksOrder = async (updatedTasks: Task[]): Promise<void> => {
        const batch = writeBatch(db);
        updatedTasks.forEach(task => {
            const taskRef = doc(db, TASKS_COLLECTION, task.id);
            batch.update(taskRef, {
                order: task.order,
                updatedAt: serverTimestamp()
            });
        });
        await batch.commit();
    }

    updateTaskColumn = async (taskId: string, newColumnId: string, order: number): Promise<Task> => {
        const taskRef = doc(db, TASKS_COLLECTION, taskId);
        await updateDoc(taskRef, {
            columnId: newColumnId,
            order,
            updatedAt: serverTimestamp()
        });
        const updatedTask = await getDoc(taskRef);
        return { id: taskId, ...updatedTask.data() } as Task;
    }

    getColumns = async (userId: string): Promise<Column[]> => {
        const userDoc = await getDoc(doc(db, COLUMNS_COLLECTION, userId));
        if (userDoc.exists()) {
            return userDoc.data().columns || [];
        }
        return [];
    }

    updateColumns = async (userId: string, columns: Column[]): Promise<void> => {
        await setDoc(doc(db, COLUMNS_COLLECTION, userId), { columns }, { merge: true });
    }

    addColumn = async (userId: string, columnName: string, columnId: string): Promise<Column> => {
        const columns = await this.getColumns(userId);
        const newColumn: Column = {
            id: columnId,
            name: columnName,
            order: columns.length + 1
        };
        columns.push(newColumn);
        await this.updateColumns(userId, columns);
        return newColumn;
    }

    deleteColumn = async (userId: string, columnId: string): Promise<void> => {
        let columns = await this.getColumns(userId);
        columns = columns.filter(col => col.id !== columnId);
        await this.updateColumns(userId, columns);

        // Delete all tasks in this column
        const tasksRef = collection(db, TASKS_COLLECTION);
        const q = query(tasksRef, where('userId', '==', userId), where('columnId', '==', columnId));
        const tasksSnapshot = await getDocs(q);
        const batch = writeBatch(db);
        tasksSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }

    renameColumn = async (userId: string, columnId: string, newName: string): Promise<void> => {
        const columns = await this.getColumns(userId);
        const columnIndex = columns.findIndex(col => col.id === columnId);
        if (columnIndex !== -1) {
            columns[columnIndex].name = newName;
            await this.updateColumns(userId, columns);
        }
    }
}

export default FirebaseTaskRepository;