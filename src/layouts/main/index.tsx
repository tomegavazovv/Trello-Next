'use client';
import { Box } from '@mui/material';
import Header from './header';
import LoadingScreen from '@/components/loading-screen';
import { useAuthContext } from '@/auth/hooks/use-auth-context';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ maxWidth: '1400px', padding: '24px 48px' }}>
      {user && <Header />}
      <Box mt={3}>{children}</Box>
    </Box>
  );
}
