import TaskRepositoryFactory from './TaskRepositoryFactory';
import type ITaskRepository from './ITaskRepository';

// firebase or localStorage
const repository = TaskRepositoryFactory.getRepository('firebase');

export const taskRepository: ITaskRepository = repository;

export const { 
  saveTask,
  updateTask,
  deleteTask,
  getTasks,
  updateTasksOrder,
  updateTaskColumn,
  getTaskOrder,
  updateTaskOrder,
  generateTaskId
} = repository;