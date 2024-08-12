import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken); // Optional: persist the token in localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Clear the token from localStorage
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
