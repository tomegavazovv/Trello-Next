
import AuthWrapper from "@/components/auth/AuthWrapper/AuthWrapper";
import styles from "./page.module.css";
import Board from "@/components/board/Board";
import LogoutButton from "@/components/shared/LogoutButton/LogoutButton";
import AddColumnButton from "@/components/shared/AddColumnButton/AddColumnButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <AuthWrapper>
        <div className={styles.header}>
          <AddColumnButton />
          <LogoutButton />
        </div>
        <Board/>
      </AuthWrapper>
    </div>
  );
}
