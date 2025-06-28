import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthService } from "@/services/googleAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authService = GoogleAuthService.getInstance();

  useEffect(() => {
    // Khôi phục session khi component mount
    const restoredUser = authService.restoreSession();
    setUser(restoredUser);
    setIsLoading(false);
  }, []);

  const login = () => {
    const authUrl = authService.getAuthUrl();
    window.location.href = authUrl;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const handleAuthCallback = async (code) => {
    try {
      setIsLoading(true);
      const user = await authService.handleAuthCallback(code);
      setUser(user);
    } catch (error) {
      console.error("Auth callback failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        handleAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
