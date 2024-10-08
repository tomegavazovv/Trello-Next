"use client";

import React from "react";

import Column from "./Column/Column";
import Spinner from "@/components/helpers/Spinner";

import styles from "./Board.module.css";
import { useTasks } from "./TasksProvider";

export default function Board() {
  const {columnToTasks, isLoading } = useTasks();

  const renderColumns = () => {
    return (Object.keys(columnToTasks)).map((column, index) => (
      <Column
        key={column}
        id={column}
        title={columnToTasks[column].title}
        tasks={columnToTasks[column].tasks}
        allowAddTask={index === 0}
      />
    ))
  }

  if (isLoading) {
    return <div className={styles.loading}><Spinner loading={isLoading} size={20} color="#000" /></div>
  }

  return (
    <div className={styles.board}>
      <div className={styles.columns}>
        {renderColumns()}
      </div>
    </div>
  );
}
