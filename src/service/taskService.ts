import { TaskInput } from "@/components/board/Column/types";
import { Task, TaskColumns } from "@/components/board/types";
import FirebaseTaskRepository from "@/utils/db/FirebaseTaskRepository";
import { getCurrentUser } from "./authService";

const repository = new FirebaseTaskRepository();

async function addTask(userId: string, task: TaskInput): Promise<Task> {
  return await repository.saveTask(userId, task);
}

function generateTaskId(): string {
  return repository.generateTaskId();
}

async function deleteTaskFromColumn(taskId: string): Promise<void> {
  return await repository.deleteTask(taskId);
}

async function updateTaskText(task: Task): Promise<void> {
  return await repository.updateTask(task);
}

export function reorderTasks(tasks: Task[], droppedTaskId: string, targetTaskId: string): Task[] {
  const droppedTaskIndex = tasks.findIndex(task => task.id === droppedTaskId);
  const targetTaskIndex = tasks.findIndex(task => task.id === targetTaskId);

  const [droppedTask] = tasks.splice(droppedTaskIndex, 1);
  tasks.splice(targetTaskIndex, 0, droppedTask);
  const updatedTasks = recalculateOrder(tasks);
  return updatedTasks;
}

async function updateTasksOrder(updatedTasks: Task[]): Promise<Task[]> {
  await repository.updateTasksOrder(updatedTasks);
  return updatedTasks;
}

async function moveTaskToColumn(taskId: string, newColumnId: string, order: number): Promise<Task> {
  return await repository.updateTaskColumn(taskId, newColumnId, order);
}

async function getTasks(): Promise<TaskColumns> {
  const user = await getCurrentUser();

  if (user) {
    console.log("Getting tasks for user", user.uid);
    return repository.getTasks(user.uid);
  }
  return {} as TaskColumns;
}

function recalculateOrder(tasks: Task[]): Task[] {
  return tasks.map((task, index) => ({
    ...task,
    order: (index + 1) * 100
  }));
}

async function addColumn(userId: string, columnName: string, columnId: string) {
  return await repository.addColumn(userId, columnName, columnId);
}

async function deleteColumn(userId: string, columnId: string) {
  return await repository.deleteColumn(userId, columnId);
}

async function renameColumn(userId: string, columnId: string, newName: string) {
  return await repository.renameColumn(userId, columnId, newName);
}

async function getColumns(userId: string) {
  return await repository.getColumns(userId);
}

export const taskService = {
  addTask,
  generateTaskId,
  deleteTaskFromColumn,
  updateTaskText,
  reorderTasks,
  updateTasksOrder,
  moveTaskToColumn,
  getTasks,
  addColumn,
  deleteColumn,
  renameColumn,
  getColumns
};