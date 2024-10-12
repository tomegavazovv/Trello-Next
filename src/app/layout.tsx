import { TasksProvider } from '@/components/column/context';
import '../globals.css';
import { AuthProvider } from '@/auth/context/firebase/auth-provider';
import MuiThemeProvider from '@/theme';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <TasksProvider>
            <MuiThemeProvider>
                {children}
            </MuiThemeProvider>
          </TasksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
