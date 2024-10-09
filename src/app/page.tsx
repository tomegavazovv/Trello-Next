import AuthWrapper from "@/components/auth/AuthWrapper/AuthWrapper";
import styles from "./page.module.css";
import Board from "@/components/board/Board";
import LogoutButton from "@/components/shared/LogoutButton/LogoutButton";
import AddColumnButton from "@/components/shared/AddColumnButton/AddColumnButton";

export default function Home() {
  return (
    <AuthWrapper>
      <div className={styles.page}>
        <div className={styles.header}>
          <AddColumnButton />
          <LogoutButton />
        </div>
        <div className={styles.boardContainer}>
          <Board />
        </div>
      </div>
    </AuthWrapper>
  );
}
