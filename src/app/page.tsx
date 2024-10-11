import { AuthWrapper } from "@/auth/context/firebase";
import NewColumnButton from "@/components/new-column-button";
import LogoutButton from "@/components/logout-button";
import { BoardView } from "@/sections/board/view";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <AuthWrapper>
      <div >
        <Box display={'flex'} justifyContent={'flex-end'} gap={2} mb={5}>
          <NewColumnButton />
          <LogoutButton />
        </Box>
        <div>
          <BoardView />
        </div>
      </div>
    </AuthWrapper>
  );
}
