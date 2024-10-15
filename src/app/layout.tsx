'use client';

import { AlertProvider } from '@/components/alert-card/context';
import '../globals.css';
import { AuthProvider } from '@/auth/context/firebase/auth-provider';
import MuiThemeProvider from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MuiThemeProvider>
              <AlertProvider>{children}</AlertProvider>
            </MuiThemeProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <div id='alert-root' />
        <div id='modal-root' />
      </body>
    </html>
  );
}
