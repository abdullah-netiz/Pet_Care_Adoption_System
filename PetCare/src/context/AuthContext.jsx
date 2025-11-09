/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would verify the token with your backend
      setIsAuthenticated(true);
      // Mock user data - replace with actual API call
      setUser({ 
        id: 1, 
        firstName: 'Pet', 
        lastName: 'Lover',
        email: 'pet.lover@example.com',
        phone: '+1 (555) 123-4567',
        userType: 'adopter'
      });
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Frontend-only updates for profile details
  const updateProfile = ({ email, phone, firstName, lastName }) => {
    setUser(prev => ({
      ...prev,
      ...(email !== undefined ? { email } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(firstName !== undefined ? { firstName } : {}),
      ...(lastName !== undefined ? { lastName } : {}),
    }));
    return Promise.resolve({ success: true });
  };

  // Frontend-only password change (no persistence)
  const updatePassword = async () => {
    // In real app, call API; here we just resolve for UX flow
    return Promise.resolve({ success: true });
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
