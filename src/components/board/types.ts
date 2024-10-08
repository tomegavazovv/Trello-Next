import { FieldValue } from "firebase/firestore";

export type Task = {
  id: string;
  text: string;
  order: number;
  column: string;
  createdAt: Date | FieldValue;
  updatedAt: Date | FieldValue;
  userId?: string;
}

export type TaskColumns = {
  [key: string]: {
    tasks: Task[];
    title: string;
  }
}

const defaultColumnTasks: TaskColumns = {
  
}

export const getEmptyColumnTasks = (): TaskColumns => {
  return JSON.parse(JSON.stringify(defaultColumnTasks));
}

