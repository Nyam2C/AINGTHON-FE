import { create } from 'zustand';

type AuthStore = {
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  userId: null,
  setUserId: id => set({ userId: id }),
}));
