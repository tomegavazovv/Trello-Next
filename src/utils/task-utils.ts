import { Task } from "@/types/task";

export function reorderTasks(tasks: Task[], droppedTaskId: string, targetTaskId: string): Task[] {
  const droppedTaskIndex = tasks.findIndex(task => task.id === droppedTaskId);
  const targetTaskIndex = tasks.findIndex(task => task.id === targetTaskId);
  console.log(droppedTaskIndex, targetTaskIndex)
  const [droppedTask] = tasks.splice(droppedTaskIndex, 1);
  tasks.splice(targetTaskIndex, 0, droppedTask);
  const updatedTasks = recalculateOrder(tasks);
  return updatedTasks;
}

function recalculateOrder(tasks: Task[]): Task[] {
  return tasks.map((task, index) => ({
    ...task,
    order: (index + 1) * 100
  }));
}

export function calculateNewOrder(tasks: Task[]): number {
  return Math.max(...tasks.map((task) => task.order), 0) + 1;
}