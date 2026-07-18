"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signIn, signOut } from "@wafflella/firebase";
import type { AdminUser } from "@wafflella/types";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((adminUser) => {
      setUser(adminUser);
      setIsLoading(false);

      // Set/clear cookie for middleware
      if (adminUser) {
        document.cookie = "wafflella-admin-auth=1; path=/; max-age=86400; SameSite=Lax";
      } else {
        document.cookie = "wafflella-admin-auth=; path=/; max-age=0";
      }
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signIn(email, password);
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    document.cookie = "wafflella-admin-auth=; path=/; max-age=0";
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
