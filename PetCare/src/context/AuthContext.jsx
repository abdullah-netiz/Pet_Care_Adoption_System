/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  updateEmail as firebaseUpdateEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { getUserProfile, updateUserProfile } from '../services/firebaseService';

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

  console.log('AuthProvider state:', { user: user?.email, isAuthenticated, isLoading });

  useEffect(() => {
    console.log('AuthContext: Setting up onAuthStateChanged listener...');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('AuthContext: onAuthStateChanged triggered, firebaseUser:', firebaseUser?.email || 'null');
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          let userProfile = await getUserProfile(firebaseUser.uid);
          
          // If profile doesn't exist, this is a new user - show role selection
          if (!userProfile) {
            // For new users, we'll create a basic profile
            const basicProfile = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              firstName: firebaseUser.displayName?.split(' ')[0] || '',
              lastName: firebaseUser.displayName?.split(' ')[1] || '',
              userType: null, // Will be set during registration
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), basicProfile);
            userProfile = { id: firebaseUser.uid, ...basicProfile };
          }
          
          setUser({ 
            id: firebaseUser.uid, 
            ...userProfile
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('AuthContext: No user logged in');
        setUser(null);
        setIsAuthenticated(false);
      }
      console.log('AuthContext: Setting isLoading to false');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (userType = null) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Check if user profile exists
      let userProfile = await getUserProfile(firebaseUser.uid);
      
      // If new user and userType provided, set it
      if (!userProfile && userType) {
        const newProfile = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          firstName: firebaseUser.displayName?.split(' ')[0] || '',
          lastName: firebaseUser.displayName?.split(' ')[1] || '',
          userType: userType,
          phone: '',
          address: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
        userProfile = { id: firebaseUser.uid, ...newProfile };
      }
      
      return { success: true, user: userProfile };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Update email in Firebase Auth if changed
      if (updates.email && updates.email !== user.email) {
        await firebaseUpdateEmail(auth.currentUser, updates.email);
      }
      
      // Update profile in Firestore
      await updateUserProfile(user.id, updates);
      
      // Update local state
      setUser(prev => ({ ...prev, ...updates }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      
      await firebaseUpdatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Error updating password:', error);
      return { success: false, error: error.message };
    }
  };

  const setUserType = async (userType) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      await updateUserProfile(user.id, { userType });
      setUser(prev => ({ ...prev, userType }));
      
      return { success: true };
    } catch (error) {
      console.error('Error setting user type:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginWithGoogle,
    logout,
    updateProfile,
    updatePassword,
    setUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
