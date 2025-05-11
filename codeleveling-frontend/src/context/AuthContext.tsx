import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, logoutUser } from '../utils/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!getAccessToken());
    setIsLoading(false);
  }, []);

  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
