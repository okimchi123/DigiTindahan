import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenGetter } from '../Model/AxiosInstance';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAccessToken: (token: string) => {
        set({ accessToken: token, isAuthenticated: true });
      },

      setAuth: (token: string, user: User) => {
        set({
          accessToken: token,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

setTokenGetter(() => useAuthStore.getState().accessToken);