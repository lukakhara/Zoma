import { create } from "zustand";
import { invalidateCsrfToken } from "../lib/csrf";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;
  setUser: (user: User) => void;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const { user } = await response.json(); // token is in the httpOnly cookie, not the body
      invalidateCsrfToken(); // session identifier changed — old CSRF token is stale
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err; // let the calling component handle the error (e.g. show a toast)
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      invalidateCsrfToken(); // session identifier changes on logout too
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  register: async (firstname, lastname, phone, email, password, role) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const { user } = await response.json();
      invalidateCsrfToken();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
    setUser: (user: User) => set({ user, isAuthenticated: true }),
}));
