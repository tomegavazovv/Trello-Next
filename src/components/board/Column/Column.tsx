import React, { useState } from "react";
import { Task as TaskType } from "../types";
import Task from "../Task/Task";
import styles from "./Column.module.css";
import AddTask from "./AddTask";
import { getNearestElementByMouseY } from "@/utils/dom/getNearestElementByMouseY";
import { useTasks } from "../TasksProvider";
import { taskService } from "@/service/taskService";
import { useAuth } from "@/components/auth/AuthProvider";
import Modal from "@/components/shared/Modal/Modal";
import { X } from "react-feather";

type ColumnProps = {
  id: string;
  title: string;
  tasks: TaskType[];
  allowAddTask: boolean;
};

function Column({
  id,
  title,
  tasks,
  allowAddTask,
}: ColumnProps) {
  const { addTask, deleteTask, reorderTasks, moveTaskToColumn, deleteColumn } = useTasks()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskText: string) => {
    const newTask = addTask(id, taskText);
    taskService.addTask(user!.uid, newTask)
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(id, taskId);
    taskService.deleteTaskFromColumn(taskId)
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
      const task = moveTaskToColumn(fromColumn, toColumn, droppedTaskId);
      taskService.moveTaskToColumn(droppedTaskId, toColumn, task.order)
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
        const updatedTasks = reorderTasks(id, droppedTaskId, targetTaskId);
        taskService.updateTasksOrder(updatedTasks[id].tasks)
      }
    }
  };

  const handleDeleteColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    taskService.deleteColumn(user!.uid, id);
    deleteColumn(id);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderModal = () => {
    return <Modal onClose={() => setIsModalOpen(false)}>
      <form onSubmit={handleDeleteColumn} className={styles.modalContent}>
        <p className={styles.modalText}>Are you sure that you want to delete the column with title <span className={styles.modalColumnTitle}> {title}</span>?</p>
        <button type="submit" className={styles.deleteColumnButtonModal}>Delete Column</button>
      </form>
    </Modal>
  }

  return (
    <div className={styles.container} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={styles.titleContainer}>
        <h2>{title}</h2>
        <div className={styles.deleteColumnButton} onClick={toggleModal}><X size={12} strokeWidth={3} /></div>
      </div>
      {tasks.sort((a, b) => a.order - b.order).map((task) => (
        <div className='task' key={task.id} data-id={task.id}>
          <Task key={task.id} initialTask={task} onDelete={handleDeleteTask} />
        </div>
      ))}
      {allowAddTask && <AddTask addTask={handleAddTask} />}
      {isModalOpen && renderModal()}
    </div>
  );
};

export default React.memo(Column);