"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Task, TaskColumns } from "./types";
import { taskService } from "@/service/taskService";
import { useAuth } from "../auth/AuthProvider";

type TasksContextType = {
  columnToTasks: TaskColumns;
  isLoading: boolean,
  addTask: (columnId: string, text: string) => Task;
  deleteTask: (columnId: string, taskId: string) => void;
  reorderTasks: (columnId: string, taskId: string, targetTaskId: string) => TaskColumns;
  moveTaskToColumn: (columnId: string, targetColumnId: string, taskId: string) => Task;
  addColumn: (name: string) => string;
  deleteColumn: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType>({
  columnToTasks: {},
  addTask: (columnId: string, text: string) => { return {} as Task },
  isLoading: false,
  deleteTask: (columnId: string, taskId: string) => { },
  reorderTasks: () => { return {} },
  moveTaskToColumn: () => { return {} as Task },
  addColumn: () => { return '' },
  deleteColumn: () => { }
});


export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [columnToTasks, setColumnToTasks] = useState<TaskColumns>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if(user){
        console.log('fetching tasks')
        setIsLoading(true);
        try {
          const tasks = await taskService.getTasks(user.uid);
          setColumnToTasks(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        } finally {
          setIsLoading(false);
        }
      }else{
        setColumnToTasks({})
      }
      
    }
    fetchTasks();
  }, [user]);

  const addTask = (columnId: string, text: string) => {
    const newTask: Task = {
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
      columnId,
      order: Math.max(...columnToTasks[columnId].tasks.map(t => t.order), 0) + 1,
      id: taskService.generateTaskId(),
    };

    const updatedColumnTasks = { ...columnToTasks };
    updatedColumnTasks[columnId].tasks.push(newTask);

    setColumnToTasks(updatedColumnTasks);
    return newTask
  };

  const deleteTask = (columnId: string, taskId: string) => {
    const updatedTasks = { ...columnToTasks };
    updatedTasks[columnId].tasks = updatedTasks[columnId].tasks.filter(task => task.id !== taskId);
    setColumnToTasks(updatedTasks);
  };

  const reorderTasks = (columnId: string, taskId: string, targetTaskId: string) => {
    const updatedTasks = { ...columnToTasks };
    const updatedTasksInColumn = taskService.reorderTasks(updatedTasks[columnId].tasks, taskId, targetTaskId);
    updatedTasks[columnId].tasks = updatedTasksInColumn;
    setColumnToTasks(updatedTasks);
    return updatedTasks;
  }

  const moveTaskToColumn = (fromColumn: string, toColumn: string, taskId: string) => {
    console.log(fromColumn, toColumn, taskId)
    const updatedColumnTasks = { ...columnToTasks };
    const task = updatedColumnTasks[fromColumn].tasks.find((task: Task) => task.id === taskId)!;
    if (task) {
      task.order = Math.max(...updatedColumnTasks[toColumn].tasks.map(t => t.order), 0) + 1;
      task.columnId = toColumn;
      updatedColumnTasks[toColumn].tasks.push(task);
      updatedColumnTasks[fromColumn].tasks = updatedColumnTasks[fromColumn].tasks.filter(task => task.id !== taskId);
      setColumnToTasks(updatedColumnTasks);
    }
    return task;
  }

  const addColumn = (name: string) => {
    const id = taskService.generateTaskId();
    const updatedColumnTasks = { ...columnToTasks }
    updatedColumnTasks[id] = { tasks: [], title: name, id }
    setColumnToTasks(updatedColumnTasks);
    console.log(updatedColumnTasks)
    return id;
  }

  const deleteColumn = (columnId: string) => {
    const updatedColumnTasks = { ...columnToTasks }
    delete updatedColumnTasks[columnId]
    setColumnToTasks(updatedColumnTasks)
  }

  const value = useMemo(() => {
    return { columnToTasks, addTask, deleteTask, reorderTasks, moveTaskToColumn, addColumn, deleteColumn, isLoading }
  }, [columnToTasks, isLoading])

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
};

export const useTasks = () => useContext(TasksContext)
