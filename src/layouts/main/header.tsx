import { Box } from '@mui/material';
import NewColumnButton from '@/components/new-column-button';
import LogoutButton from '@/components/logout-button';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <NewColumnButton />
      <LogoutButton />
    </Box>
  );
}
