import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginModalOpen: boolean;
  loginMode: 'login' | 'register';

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setLoginModalOpen: (open: boolean) => void;
  setLoginMode: (mode: 'login' | 'register') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  loginModalOpen: false,
  loginMode: 'login',

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  setLoginModalOpen: (open) => set({ loginModalOpen: open }),

  setLoginMode: (mode) => set({ loginMode: mode }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));