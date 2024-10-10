"use client";

import React from "react";


import styles from "./Board.module.css";
import Column from "../../../components/column/column";
import Spinner  from "@/components/spinner";
import { useTasksContext } from "@/components/column/context";

export default function Board() {
  const {columnToTasks, isLoading } = useTasksContext();

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
    return <div className={styles.loadingContainer}><Spinner speedMultiplier={1} loading={isLoading} size={40} color="#000" /></div>
  }

  return (
    <div className={styles.board}>
      <div className={styles.columns}>
        {renderColumns()}
      </div>
    </div>
  );
}
