import "./globals.css";
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from '@/providers/QueryProvider';

export const metadata = {
  title: "WinTutor - Learn Computer Skills",
  description: "Interactive computer skills training",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <QueryProvider>
            <AuthProvider>
              <SettingsProvider>
                {children}
              </SettingsProvider>
            </AuthProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
