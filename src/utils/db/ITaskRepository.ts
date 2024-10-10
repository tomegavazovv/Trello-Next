import { TaskInput } from "@/sections/board/view/types";
import { Task, TaskColumns } from "@/components/board/types";

interface ITaskRepository {
    saveTask(task: TaskInput): Promise<Task>;
    generateTaskId(): string;
    updateTask(task: Task): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    getTasks(userId: string): Promise<TaskColumns>;
    updateTasksOrder(updatedTasks: Task[]): Promise<void>;
    updateTaskColumn(taskId: string, newColumn: string, order: number): Promise<Task>;
    getTaskOrder(taskId: string): Promise<number>;
    updateTaskOrder(taskId: string, newOrder: number): Promise<Task>;
}

export default ITaskRepository;