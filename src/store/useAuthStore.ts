import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

const TOKEN_KEY = 'jwt';

type JwtPayload = {
  sub?: string;
  userId?: number;
  exp?: number;
};

type AuthStore = {
  token: string | null;
  userId: number | null;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
};

function parseUserId(token: string): number | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (typeof payload.userId === 'number') return payload.userId;
    if (payload.sub) {
      const n = Number(payload.sub);
      return Number.isFinite(n) ? n : null;
    }
    return null;
  } catch {
    return null;
  }
}

function isExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return false;
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const useAuthStore = create<AuthStore>(set => ({
  token: null,
  userId: null,
  login: token => {
    window.localStorage.setItem(TOKEN_KEY, token);
    set({ token, userId: parseUserId(token) });
  },
  logout: () => {
    window.localStorage.removeItem(TOKEN_KEY);
    set({ token: null, userId: null });
  },
  hydrate: () => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token || isExpired(token)) {
      window.localStorage.removeItem(TOKEN_KEY);
      set({ token: null, userId: null });
      return;
    }
    set({ token, userId: parseUserId(token) });
  },
}));
