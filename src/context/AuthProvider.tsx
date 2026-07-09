import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API}/api/auth/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
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

    const { user } = await response.json(); // no token in the body anymore — it's in the cookie
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }, []);

  const register = useCallback(
    async (
      firstname: string,
      lastname: string,
      phone: string,
      email: string,
      password: string,
      role: string,
    ) => {
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
      setUser(user);
    },
    [],
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
