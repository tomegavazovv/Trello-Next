import { AuthWrapper } from "@/auth/context/firebase";
import MainLayout from "@/layouts/main";
import { BoardView } from "@/sections/board/view";

export default function Home() {
  return (
    <AuthWrapper>
      <MainLayout>
        <BoardView />
      </MainLayout>
    </AuthWrapper>
  );
}
