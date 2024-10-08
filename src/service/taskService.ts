import { TaskInput } from "@/components/board/Column/types";
import { Task, TaskColumns } from "@/components/board/types";
import { deleteTask, saveTask, updateTask, updateTaskColumn, updateTasksOrder, generateTaskId as generateTaskIdFromDb, getTasks as getTasksFromDb } from "@/utils/db/db";
import { getCurrentUser } from "./authService";


export async function addTask(task: TaskInput): Promise<Task> {
    return await saveTask(task);
}

export function generateTaskId(): string {
    return generateTaskIdFromDb();
}

export function deleteTaskFromColumn(taskId: string): Promise<void> {
    return deleteTask(taskId);
}

export function updateTaskText(task: Task): Promise<void> {
    return updateTask(task);
}

export function reorderTasks(tasks: Task[], droppedTaskId: string, targetTaskId: string): Task[] {
    const droppedTaskIndex = tasks.findIndex(task => task.id === droppedTaskId);
    const targetTaskIndex = tasks.findIndex(task => task.id === targetTaskId);

    const [droppedTask] = tasks.splice(droppedTaskIndex, 1);
    tasks.splice(targetTaskIndex, 0, droppedTask);
    const updatedTasks = recalculateOrder(tasks);
    return updatedTasks;
}

export async function updateTasksOrderOnServer(updatedTasks: Task[]): Promise<Task[]> {
    await updateTasksOrder(updatedTasks);
    return updatedTasks;
}

export function moveTaskToColumn(taskId: string, newColumn: string, order: number): Promise<Task> {
    return updateTaskColumn(taskId, newColumn, order);
}

export async function getTasks(): Promise<TaskColumns> {
  const user = await getCurrentUser();

  if(user) {
    console.log("Getting tasks for user", user.uid);
    return getTasksFromDb(user.uid);
  }
  return {} as TaskColumns;
}

function recalculateOrder(tasks: Task[]): Task[] {
  return tasks.map((task, index) => ({
      ...task,
      order: (index + 1) * 100
  }));
}

