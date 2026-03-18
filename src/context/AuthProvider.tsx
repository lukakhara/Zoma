// import {
//   useContext,
//   createContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email, password) => Promise<void>;
//   logout: () => void;
//   register: (name, email, password) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = (children: ReactNode) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const register = (name:string, email:string, password:string) => {

//   }

//   return
//   <AuthContext.Provider
//     value={{
//       user,
//       isLoading,
//       isAuthenticated: !!user,
//       login,
//       logout,
//       register,
//     }}
//   >
//     {children}
//   </AuthContext.Provider>;
// };

// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Navigate } from "react-router-dom";

interface User {
  id: string;
  fistname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    fistname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`/api/users/${token}`);
        if (response.ok) {
          const user = await response.json();
          setUser({
            id: user.id,
            fistname: user.fistname,
            lastname: user.lastname,
            phone: user.phone,
            password: user.password,
            email: user.email,
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

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `/api/users?email=${email}&password=${password}`,
      );
      const users = await response.json();

      if (users.length === 0) throw new Error("Invalid email or password");

      const user = users[0];
      localStorage.setItem("token", user.id); // ✅ Use id as fake token
      setUser({
        id: user.id,
        fistname: user.fistname,
        lastname: user.lastname,
        phone: user.phone,
        password: user.password,
        email: user.email,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (
    fistname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
  ) => {
    try {
      // ✅ Check if email already exists
      const existing = await fetch(`/api/users?email=${email}`);
      const existingUsers = await existing.json();
      if (existingUsers.length > 0) {
        throw new Error("Email already exists");
      }

      // ✅ Save user to db.json
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fistname,
          lastname,
          phone,
          email,
          password,
          id: Date.now().toString(),
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const user = await response.json();
      localStorage.setItem("token", user.id); // ✅ Use id as fake token
      setUser({
        id: user.id,
        fistname: user.fistname,
        lastname: user.lastname,
        phone: user.phone,
        password: user.password,
        email: user.email,
      });

    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
