import { Task, TaskColumns } from '@/types/task';

export type TasksContextType = {
  columnToTasks: TaskColumns;
  isLoading: boolean;
  addTask: (columnId: string, taskText: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  updateTasksOrder: (
    columnId: string,
    taskId: string,
    targetTaskId: string
  ) => void;
  moveTaskToColumn: (
    fromColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
  addColumn: (name: string) => void;
  deleteColumn: (id: string) => void;
  updateTask: (task: Task) => void;
};
