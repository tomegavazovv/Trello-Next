"use client";

import React from "react";

import Column from "./Column/Column";
import Spinner from "@/components/helpers/Spinner";

import styles from "./Board.module.css";
import { useBoardState } from "./useBoardState";

export default function Board() {
  const {
    columnTasks,
    isLoading,
    handleAddColumn,
    handleAddTask,
    handleDeleteTask,
    handleDroppedInDifferentColumn,
    handleReorderTasks
  } = useBoardState();

  const renderColumns = () => {
    return (Object.keys(columnTasks)).map((column, index) => (
      <Column
        key={column}
        id={column}
        title={columnTasks[column].title}
        tasks={columnTasks[column].tasks}
        allowAddTask={index === 0}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onDroppedInDifferentColumn={handleDroppedInDifferentColumn}
        onReorderTasks={handleReorderTasks}
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
