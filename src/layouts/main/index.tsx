import { Box } from '@mui/material';
import Header from './header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Box sx={{ maxWidth: '1400px', padding: '24px 48px' }}>
      <Header />
      <Box mt={3}>{children}</Box>
    </Box>
  );
}
