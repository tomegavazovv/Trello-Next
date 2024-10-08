"use client"

import { useState } from "react";
import styles from "./AddColumnButton.module.css";
import { Plus } from 'react-feather'
import Modal from "../Modal/Modal";

export default function AddColumnButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleClick = () => {
    setIsOpen(true);
  }

  if (isOpen) {
    return <Modal onClose={() => setIsOpen(false)}>
      <div className={styles.modalContent}>
        <input value={newColumnTitle} type="text" placeholder="New Column Title" onChange={(e) => setNewColumnTitle(e.target.value)} />
        <button disabled={!newColumnTitle} className={styles.addColumnModalButton} onClick={() => setIsOpen(false)}>Add Column</button>
      </div>
    </Modal>
  }

  return (
    <button className={`${styles.button} ${styles.addColumnButton}`} onClick={handleClick}>
      <Plus size={16} className={styles.icon} />
      <span className={styles.buttonText}>Add Column</span>
    </button>
  )
}