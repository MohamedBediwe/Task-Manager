'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { getMe } from '@/lib/auth-api';

export default function AuthInitializer() {
  const { setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        logout();
      }
    };

    checkAuth();
  }, [setUser, logout]);

  return null;
}