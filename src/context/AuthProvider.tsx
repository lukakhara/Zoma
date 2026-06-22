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
}

interface AuthContextType {
  user: User | null;
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
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log("AuthProvider rendered"); // add this

  const [user, setUser] = useState<User | null>({
    id: "1",
    firstname: "Luka",
    lastname: "Dev",
    phone: "+995 55 55 55",
    email: "luka@dev.com",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`/api/users/${token}`);
        if (response.ok) {
          const data = await response.json();
          setUser({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
          });
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(
        `/api/users?email=${encodeURIComponent(email)}`,
      );
      if (!response.ok) throw new Error("Server error");

      const users = await response.json();
      if (users.length === 0) throw new Error("Invalid email or password");

      const data = users[0];
      localStorage.setItem("token", data.id);
      setUser({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const register = useCallback(
    async (
      firstname: string,
      lastname: string,
      phone: string,
      email: string,
      password: string,
    ) => {
      try {
        const existing = await fetch(
          `/api/users?email=${encodeURIComponent(email)}`,
        );
        const existingUsers = await existing.json();
        if (existingUsers.length > 0) throw new Error("Email already exists");

        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            phone,
            email,
            password,
            id: Date.now().toString(),
          }),
        });

        if (!response.ok) throw new Error("Registration failed");

        const data = await response.json();
        localStorage.setItem("token", data.id);
        setUser({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          email: data.email,
        });
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register],
  );
  console.log("AuthProvider is rendered");

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
