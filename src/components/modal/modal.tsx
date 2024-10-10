import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  const modalRoot = useRef(document.getElementById("modal-root") || document.createElement("div"));

  useEffect(() => {
    if (!document.getElementById("modal-root")) {
      modalRoot.current.id = "modal-root";
      document.body.appendChild(modalRoot.current);
    }

    return () => {
      if (modalRoot.current.parentElement === document.body) {
        document.body.removeChild(modalRoot.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  }

  return createPortal(
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot.current
  );
}