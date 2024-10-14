import { Box } from '@mui/material';
import Header from './header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box mt={3}>{children}</Box>
      </Box>
    </Box>
  );
}
