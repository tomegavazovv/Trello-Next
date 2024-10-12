import { AuthWrapper } from "@/auth/context/firebase";
import { BoardView } from "@/sections/board/view";

export default function Home() {
  return (
    <AuthWrapper>
        <BoardView />
    </AuthWrapper>
  );
}
