"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: () => Promise<boolean>;
  login: (userData: User) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: async () => false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const isLoggedIn = async (): Promise<boolean> => {
    return !!user;
  };

  const login = async (userData: User): Promise<void> => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Set a cookie for auth state
    document.cookie = `authToken=true; path=/; max-age=86400`;
  };

  const register = async (userData: User): Promise<void> => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Set a cookie for auth state
    document.cookie = `authToken=true; path=/; max-age=86400`;

    // Redirect to home page after registration
    router.push("/");
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem("user");

    // Remove the auth cookie
    document.cookie = "authToken=; path=/; max-age=0";

    // Redirect to login page after logout
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
