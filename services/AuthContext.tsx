import { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@/config/firebaseConfig';

interface AuthContextType {
  authToken: string | null;
  userId: number | null;
  loading: boolean;
  authInitialized: boolean;
  login: (token: string, id: number, rememberMe: boolean, email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Initialize auth state from AsyncStorage first
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 AuthInitializing - Starting initializeAuth...');
      try {
        console.log('🔐 AuthInitializing - Fetching data from AsyncStorage...');
        const [storedToken, storedRememberMe, storedUserId] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('rememberMe'),
          AsyncStorage.getItem('userId'),
        ]);

        console.log('🔐 AuthInitializing - AsyncStorage results:');
        console.log('  - storedToken:', storedToken ? `${storedToken.substring(0, 20)}...` : 'null');
        console.log('  - storedRememberMe:', storedRememberMe);
        console.log('  - storedUserId:', storedUserId);

        const rememberMeData = storedRememberMe ? JSON.parse(storedRememberMe) : null;
        console.log('🔐 AuthInitializing - Parsed rememberMeData:', rememberMeData);
        
        if (rememberMeData?.rememberMe && storedToken && storedUserId) {
          console.log('🔐 AuthInitializing - Remember Me is enabled and data exists, setting auth state...');
          console.log('  - Setting authToken to:', `${storedToken.substring(0, 20)}...`);
          console.log('  - Setting userId to:', Number(storedUserId));
          setAuthToken(storedToken);
          setUserId(Number(storedUserId));
        } else {
          console.log('🔐 AuthInitializing - Not restoring auth state because:');
          console.log('  - rememberMeData?.rememberMe:', rememberMeData?.rememberMe);
          console.log('  - storedToken exists:', !!storedToken);
          console.log('  - storedUserId exists:', !!storedUserId);
        }
        console.log('🔐 AuthInitializing - initializeAuth completed');
        setAuthInitialized(true);
      } catch (error) {
        console.error('🔐 AuthInitializing - Error initializing auth state:', error);
        setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    console.log('AuthToken listener called: ', authToken?.substring(0, 10) + '...', 'authInitialized: ', authInitialized);
    
    try {
      const unsubscribe = getAuth().onAuthStateChanged(async (user: any) => {
        try {
          if (user) {
            console.log('🔐 AuthToken context checking - Firebase user exists:', user.uid);
            // Only refresh token if we already have an authToken (user was logged in)
            if (authToken) {
              const token = await refreshAuthToken();
              if (!token) {
                await logout();
              }
            }
          } else if (authToken && authInitialized) {
            console.log('🔐 AuthContext - No Firebase user but authToken exists, logging out');
            // Only logout if we actually had an authToken (user was logged in) AND auth has been initialized
            await logout();
          }
          console.log('🔐 AuthContext - Auth state changed, user:', user ? 'exists' : 'null');
        } catch (error) {
          console.error('🔐 AuthContext - Error in auth state change:', error);
        } finally {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('🔐 AuthContext - Error setting up auth listener:', error);
      setLoading(false);
      return () => {};
    }
  }, [authToken, authInitialized]); // Add authToken and authInitialized as dependencies

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
      // Get React Native Firebase auth
      const currentUser = getAuth().currentUser;
      
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
        authInitialized,
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