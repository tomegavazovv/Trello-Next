import { TasksProvider } from "@/components/board/TasksProvider";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TasksProvider>
            {children}
          </TasksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
