import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { GoogleAuthService } from '../services/googleAuth';
import { isGoogleOAuthConfigured } from '../config/google';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const googleAuthService = GoogleAuthService.getInstance();

  // Initialize Google Auth
  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        await googleAuthService.initialize();
        if (isGoogleOAuthConfigured()) {
          console.log('Google Auth initialized successfully');
        } else {
          console.log('Google Auth in demo mode - configure CLIENT_ID for real OAuth');
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      }
    };

    initializeGoogleAuth();
  }, []);

  // Listen for Google Sign-In events
  useEffect(() => {
    const handleGoogleSignIn = (event: any) => {
      const user = event.detail;
      setUser(user);
      setLoading(false);
      console.log('User signed in:', user);
    };

    const handleGoogleSignInError = (event: any) => {
      console.error('Google Sign-In error:', event.detail);
      setLoading(false);
    };

    window.addEventListener('googleSignIn', handleGoogleSignIn);
    window.addEventListener('googleSignInError', handleGoogleSignInError);

    return () => {
      window.removeEventListener('googleSignIn', handleGoogleSignIn);
      window.removeEventListener('googleSignInError', handleGoogleSignInError);
    };
  }, []);

  // Real Google Sign-In
  const signIn = () => {
    setLoading(true);
    try {
      googleAuthService.signIn();
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    googleAuthService.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    signIn,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
