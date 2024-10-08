import React from "react";
import { Task as TaskType } from "../types";
import Task from "../Task/Task";
import styles from "./Column.module.css";
import AddTask from "./AddTask";
import { getNearestElementByMouseY } from "@/utils/dom/getNearestElementByMouseY";

type ColumnProps = {
  id: string;
  title: string;
  tasks: TaskType[];
  allowAddTask: boolean;
  onAddTask: (columnId: string, taskText: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onReorderTasks: (columnId: string, taskId: string, targetTaskId: string) => void;
  onDroppedInDifferentColumn: (fromColumn: string, toColumn: string, taskId: string) => void;
};

function Column({
  id,
  title,
  tasks,
  allowAddTask,
  onAddTask,
  onDeleteTask,
  onReorderTasks,
  onDroppedInDifferentColumn,
}: ColumnProps) {

  const handleAddTask = (taskText: string) => {
    onAddTask(id, taskText);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(id, taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedTaskId = e.dataTransfer.getData('id');
    const fromColumn = e.dataTransfer.getData('fromColumn');
    const toColumn = id;

    if (fromColumn !== toColumn) {
      onDroppedInDifferentColumn(fromColumn, toColumn, droppedTaskId);
    } else {
      let targetTaskId: string | null = null;

      const targetTask = e.target as HTMLElement;
      const targetTaskElement = targetTask.closest('.task') as HTMLDivElement;
      if (targetTaskElement) {
        targetTaskId = targetTaskElement.dataset.id ?? null;
      } else {
        const mouseY = e.clientY;
        targetTaskId = getNearestElementByMouseY('.task', mouseY).getAttribute('data-id');
      }

      if (targetTaskId && targetTaskId !== droppedTaskId) {
        onReorderTasks(id, droppedTaskId, targetTaskId);
      }
    }
  };

  return (
    <div className={styles.container} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{title}</h2>
      {tasks.sort((a, b) => a.order - b.order).map((task) => (
        <div className='task' key={task.id} data-id={task.id}>
          <Task key={task.id} initialTask={task} onDelete={handleDeleteTask} />
        </div>
      ))}
      {allowAddTask && <AddTask addTask={handleAddTask} />}
    </div>
  );
};

export default React.memo(Column);