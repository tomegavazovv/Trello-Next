import styles from "./add-task-form.module.css";
import { useState } from "react";

type AddTaskProps = {
  addTask: (task: string) => void;
}

export default function AddTask({ addTask }: AddTaskProps) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    addTask(taskText);
    setTaskText('');
  }

  return (
    <form className={styles.addTask} onSubmit={handleSubmit}>
      <textarea onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }} onChange={(e) => setTaskText(e.target.value)} placeholder="Add a task" value={taskText} />
      <button disabled={!taskText} type="submit">Add</button>
    </form>
  );
}