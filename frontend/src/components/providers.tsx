'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import AuthInitializer from './auth-initializer';
import LoginModal from './login-modal';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthInitializer />
      {children}
      <LoginModal />
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
}