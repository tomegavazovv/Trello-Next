import React from "react";
import { X } from "react-feather";

import styles from "./Task.module.css";
import {taskService} from "@/service/taskService";
import { Task as TaskType } from "../../types/task";

type TaskProps = {
  initialTask: TaskType;
  onDelete: (id: string) => void;
}

export default function Task({ initialTask, onDelete }: TaskProps) {
  const [task, setTask] = React.useState(initialTask);

  const handleDelete = () => {
    onDelete(task.id);
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', task.id);
    e.dataTransfer.setData('fromColumn', task.columnId);
    e.currentTarget.style.opacity = '0.3';
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    target.contentEditable = 'false';
    const updatedText = target.innerText.trim();

    if (updatedText === '') {
      setTask({
        ...task,
        text: task.text + ' ',
      });
      return;
    }

    const updatedTask = {
      ...task,
      text: updatedText.trim(),
    };

    taskService.updateTaskText(updatedTask);
    setTask(updatedTask);
  }

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    target.contentEditable = 'true';
    target.focus();
  }

  return (
    <div className={styles.container} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <span onDoubleClick={handleDoubleClick} className={styles.text} onBlur={handleBlur}>{task.text.trim()}</span>
      <div className={styles.deleteBtn} onClick={handleDelete}><X size={12} /></div>
    </div>
  );
}

