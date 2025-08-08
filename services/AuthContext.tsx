import { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Remove the top-level Firebase import to prevent initialization errors
// import { getAuth } from '@/config/firebaseConfig';

interface AuthContextType {
  authToken: string | null;
  userId: number | null;
  loading: boolean;
  login: (token: string, id: number, rememberMe: boolean, email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  
  // Initialize auth state from AsyncStorage first
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [storedToken, storedRememberMe, storedUserId] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('rememberMe'),
          AsyncStorage.getItem('userId'),
        ]);

        const rememberMeData = storedRememberMe ? JSON.parse(storedRememberMe) : null;
        
        if (rememberMeData?.rememberMe && storedToken && storedUserId) {
          setAuthToken(storedToken);
          setUserId(Number(storedUserId));
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
      }
    };

    initializeAuth();
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    const setupAuth = async () => {
      try {
        // Lazy import Firebase auth to prevent initialization errors
        const { getAuth } = await import('@/config/firebaseConfig');
        const auth = await getAuth();
        const unsubscribe = auth().onAuthStateChanged(async (user: any) => {
          if (user) {
            // Only refresh token if we already have an authToken (user was logged in)
            if (authToken) {
              const token = await refreshAuthToken();
              if (!token) {
                await logout();
              }
            }
          } else if (authToken) {
            // Only logout if we actually had an authToken (user was logged in)
            await logout();
          }
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error setting up auth listener:', error);
        setLoading(false);
      }
    };

    setupAuth();
  }, [authToken]); // Add authToken as dependency

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
      // Lazy import Firebase auth to prevent initialization errors
      const { getAuth } = await import('@/config/firebaseConfig');
      const auth = await getAuth();
      const currentUser = auth().currentUser;
      
      if (currentUser) {
        // Get the current token without forcing refresh
        const currentToken = await currentUser.getIdToken(false);
        
        // Decode the JWT token to get the expiration time
        const tokenPayload = JSON.parse(atob(currentToken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        
        // Only refresh if token will expire in the next 5 minutes
        if (expirationTime - currentTime <= 5 * 60 * 1000) {
          const newToken = await currentUser.getIdToken(true);
          console.log('Refreshing for newToken', newToken);
          await AsyncStorage.setItem('authToken', newToken);
          setAuthToken(newToken);
          return newToken;
        }
        
        // If token is still valid, return the current token
        return currentToken;
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
    <AuthContext.Provider 
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
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserProvider');
  }
  return context;
}; 