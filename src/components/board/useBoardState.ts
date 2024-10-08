import { useState, useEffect } from 'react';
import { TaskColumns, Task } from './types';
import { getTasks, addTask, deleteTaskFromColumn, moveTaskToColumn, reorderTasks, updateTasksOrderOnServer, generateTaskId } from '@/service/taskService';

export function useBoardState() {
  const [columnTasks, setColumnTasks] = useState<TaskColumns>({} as TaskColumns);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const tasks = await getTasks();
        setColumnTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleDroppedInDifferentColumn = (fromColumn: string, toColumn: string, taskId: string) => {
    const updatedColumnTasks = { ...columnTasks };
    const task = updatedColumnTasks[fromColumn].tasks.find((task: Task) => task.id === taskId);
    if (task) {
      task.order = Math.max(...updatedColumnTasks[toColumn].tasks.map(t => t.order), 0) + 1;
      task.column = toColumn;
      updatedColumnTasks[toColumn].tasks.push(task);
      updatedColumnTasks[fromColumn].tasks = updatedColumnTasks[fromColumn].tasks.filter(task => task.id !== taskId);
      setColumnTasks(updatedColumnTasks);
      moveTaskToColumn(taskId, toColumn, task.order);
    }
  }

  const handleAddTask = (columnId: string, task: string) => {
    const newTask: Task = {
      text: task,
      createdAt: new Date(),
      updatedAt: new Date(),
      column: columnId,
      order: Math.max(...columnTasks[columnId].tasks.map(t => t.order), 0) + 1,
      id: generateTaskId(),
    };
    const updatedColumnTasks = { ...columnTasks };
    updatedColumnTasks[columnId].tasks.push(newTask);

    setColumnTasks(updatedColumnTasks);
    addTask(newTask);
  }

  const handleDeleteTask = (columnId: string, taskId: string) => {
    const updatedColumnTasks = { ...columnTasks };
    updatedColumnTasks[columnId].tasks = updatedColumnTasks[columnId].tasks.filter(task => task.id !== taskId);
    setColumnTasks(updatedColumnTasks);
    deleteTaskFromColumn(taskId);
  }

  const handleReorderTasks = (columnId: string, taskId: string, targetTaskId: string) => {
    const updatedColumnTasks = { ...columnTasks };
    const updatedTasks = reorderTasks(updatedColumnTasks[columnId].tasks, taskId, targetTaskId);
    updatedColumnTasks[columnId].tasks = updatedTasks;
    setColumnTasks(updatedColumnTasks);
    updateTasksOrderOnServer(updatedTasks);
  }

  const handleAddColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.currentTarget.elements[0] as HTMLInputElement;
    const newColumnTitle = inputElement.value;
    const newColumnId = newColumnTitle.toLowerCase().replace(/\s/g, '-');
    
    const newColumnTasks = {
      title: newColumnTitle,
      tasks: [],
    };
    setColumnTasks({ ...columnTasks, [newColumnId]: newColumnTasks });
    inputElement.value = '';
  }

  return {
    columnTasks,
    isLoading,
    handleDroppedInDifferentColumn,
    handleAddTask,
    handleDeleteTask,
    handleReorderTasks,
    handleAddColumn,
  };
}