import styles from "./BoardSkeleton.module.css";

export default function BoardSkeleton() {
  return (
    <div className={styles.skeleton} >
      <div className={styles.column}>
        <div className={styles.columnHeader}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
      </div>

      <div className={styles.column}>
        <div className={styles.columnHeader}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
      </div>

      <div className={styles.column}>
        <div className={styles.columnHeader}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
        <div className={styles.task}></div>
      </div>
    </div>
  );
}