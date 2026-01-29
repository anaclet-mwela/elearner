import "./globals.css";
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "WinTutor - Learn Computer Skills",
  description: "Interactive computer skills training",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <AuthProvider>
            <SettingsProvider>
              {children}
            </SettingsProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
