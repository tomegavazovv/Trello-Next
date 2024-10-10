import { Task, TaskColumns } from "@/types/task";


export type TasksContextType = {
    columnToTasks: TaskColumns;
    isLoading: boolean,
    addTask: (columnId: string, text: string) => Task;
    deleteTask: (columnId: string, taskId: string) => void;
    reorderTasks: (columnId: string, taskId: string, targetTaskId: string) => TaskColumns;
    moveTaskToColumn: (columnId: string, targetColumnId: string, taskId: string) => Task;
    addColumn: (name: string) => string;
    deleteColumn: (id: string) => void;
  };

