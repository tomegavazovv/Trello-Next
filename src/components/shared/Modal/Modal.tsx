import styles from "./Modal.module.css";

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  }

  return <div className={styles.modal} onClick={handleClick}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
}