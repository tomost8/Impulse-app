import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

interface UserContextType {
  authToken: string | null;
  userId: number | null;
  loading: boolean;
  login: (token: string, id: number, rememberMe: boolean, email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<string | null>;
}

const UserContext = createContext<UserContextType | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Initial load
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const [storedRememberMe, storedAuthToken, storedUserId] = await Promise.all([
        AsyncStorage.getItem('rememberMe'),
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('userId'),
      ]);

      const rememberMeData = storedRememberMe ? JSON.parse(storedRememberMe) : null;
      if (rememberMeData?.rememberMe) {
        setAuthToken(storedAuthToken);
        setUserId(Number(storedUserId));
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, id: number, rememberMe: boolean, email: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('authToken', token),
        AsyncStorage.setItem('userId', id.toString()),
        AsyncStorage.setItem('rememberMe', JSON.stringify({
          rememberMe,
          email: rememberMe ? email : null
        }))
      ]);
      setAuthToken(token);
      setUserId(id);
    } catch (error) {
      console.error('Error storing login data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all keys from AsyncStorage
      setAuthToken(null);
      setUserId(null);
    } catch (error) {
      console.error('Error removing login data:', error);
      throw error;
    }
  };

  const refreshAuthToken = async () => {
    try {
      // Get the Firebase auth instance
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // This will use the refresh token internally to get a new ID token
        const newToken = await currentUser.getIdToken(true);
        await AsyncStorage.setItem('authToken', newToken);
        setAuthToken(newToken);
        return newToken;
      }
      
      // If no current user, force logout
      await logout();
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      await logout();
      return null;
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        authToken, 
        userId, 
        loading, 
        login, 
        logout,
        refreshAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserProvider');
  }
  return context;
}; 