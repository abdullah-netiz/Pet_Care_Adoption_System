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
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        // If there's an error parsing user data, clear everything
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  // Add a pet to user's listings
  const addPet = (petData) => {
    const newPet = {
      id: Date.now(),
      ...petData,
      ownerId: user?.id,
      createdAt: new Date().toISOString()
    };
    setUserPets(prev => [...prev, newPet]);
    return Promise.resolve({ success: true, pet: newPet });
  };

  // Delete a pet from user's listings
  const deletePet = (petId) => {
    setUserPets(prev => prev.filter(pet => pet.id !== petId));
    return Promise.resolve({ success: true });
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    updatePassword,
    userPets,
    addPet,
    deletePet
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
