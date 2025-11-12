// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/auth.service";

// Create a new context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app
export const AuthProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);
  // State to track loading status during authentication checks
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Auth status check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  // Register a new user
  const register = async (email, password, name) => {
    try {
      const session = await authService.createAccount(email, password, name);
      // After registration, fetch and set the user
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return { success: true, data: session };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error };
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      const session = await authService.login(email, password);
      // After login, fetch and set the user
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return { success: true, data: session };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, error };
    }
  };

  // Value to be provided to consumers of this context
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};