"use client";

import { createContext, useContext } from "react";
import { TasksContextType } from "../types";

export const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export const useTasksContext = () => {
  const context = useContext(TasksContext)

  if (!context) throw new Error("useTasksContext must be used inside TasksProvider")

  return context;
}