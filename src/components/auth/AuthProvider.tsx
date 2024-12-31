import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { sessionManager } from '../../lib/auth/session';
import LoadingScreen from '../LoadingScreen';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, sessionToken, logout } = useAuthStore();

  useEffect(() => {
    // Increased minimum loading time to 3.5 seconds
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 3500));
    
    // Validate session on mount and after storage changes
    const validateSession = async () => {
      if (sessionToken) {
        const session = sessionManager.validateSession(sessionToken);
        if (!session) {
          logout();
        }
      }
      
      // Wait for minimum load time
      await minLoadTime;
      setIsLoading(false);
    };

    validateSession();
    window.addEventListener('storage', validateSession);
    
    return () => {
      window.removeEventListener('storage', validateSession);
    };
  }, [sessionToken, logout]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};