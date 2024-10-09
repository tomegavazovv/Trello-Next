import { FieldValue } from "firebase/firestore";

export type Task = {
  id: string;
  text: string;
  order: number;
  columnId: string;
  createdAt: Date | FieldValue;
  updatedAt: Date | FieldValue;
  userId?: string;
}

export type TaskColumns = {
  [key: string]: {
    tasks: Task[];
    title: string;
    id: string
  }
}



