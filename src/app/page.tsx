import styles from "./page.module.css";
import { AuthWrapper } from "@/auth/context/firebase";
import NewColumnButton from "@/components/new-column-button";
import LogoutButton from "@/components/logout-button";
import { BoardView } from "@/sections/board/view";

export default function Home() {
  return (
    <AuthWrapper>
      <div className={styles.page}>
        <div className={styles.header}>
          <NewColumnButton />
          <LogoutButton />
        </div>
        <div className={styles.boardContainer}>
          <BoardView />
        </div>
      </div>
    </AuthWrapper>
  );
}
