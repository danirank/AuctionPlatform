import { authService } from "../services/AuthService/AuthService";
import { GetUser } from "../services/UserService/UserServices";
import { createContext, useState, useEffect, useContext } from "react";
import type { AuthContextType } from "../types/Types";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshUser = async () => {
   
    const loggedIn = await authService.isLoggedIn();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      setUser(null);
      return;
    }

    
    const userId = authService.getUserId();

    if (!userId) {
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

   
    const u = await GetUser(userId);
    setUser(u);
  };

  
  const logout = () => {
    authService.clearToken();
    setUser(null);
    setIsLoggedIn(false);
  };

  
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
