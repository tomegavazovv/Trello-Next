"use client"

import { useState } from "react";
import styles from "./new-column-button.module.css";
import { Plus } from 'react-feather'
import Modal from "../modal/modal";
import { taskService } from "@/service/taskService";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import { useTasksContext } from "../column/context";

export default function NewColumnButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const { user } = useAuthContext();
  const { addColumn } = useTasksContext()


  const handleClick = () => {
    setIsOpen(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsOpen(false)
    setNewColumnTitle('')
    const id = addColumn(newColumnTitle);
    taskService.addColumn(user!.uid, newColumnTitle, id);
  }

  if (isOpen) {
    return <Modal onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} className={styles.modalContent}>
        <input value={newColumnTitle} type="text" placeholder="New Column Title" onChange={(e) => setNewColumnTitle(e.target.value)} />
        <button type="submit" disabled={!newColumnTitle} className={styles.addColumnModalButton}>Add Column</button>
      </form>
    </Modal>
  }

  return (
    <button className={`${styles.button} ${styles.addColumnButton}`} onClick={handleClick}>
      <Plus size={16} className={styles.icon} />
      <span className={styles.buttonText}>Add Column</span>
    </button>
  )
}