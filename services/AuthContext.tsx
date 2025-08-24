import { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@/config/firebaseConfig';
import { onAuthStateChanged, getIdToken } from '@react-native-firebase/auth';

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
  
  // Add a ref to track if we've already loaded auth data to prevent unnecessary clearing
  const hasLoadedAuthData = useRef(false);
  
  // Track if we're currently processing auth state changes to prevent loops
  const isProcessingAuthChange = useRef(false);
  const authListenerUnsubscribe = useRef<(() => void) | null>(null);
  const authListenerSetup = useRef(false);
  
  // Add refs to track the current auth state to prevent unnecessary re-renders
  const currentAuthToken = useRef<string | null>(null);
  const currentUserId = useRef<number | null>(null);
  
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
          currentAuthToken.current = storedToken;
          currentUserId.current = Number(storedUserId);
          hasLoadedAuthData.current = true;
        }
        setAuthInitialized(true);
      } catch (error) {
        console.error('Error initializing auth state:', error);
        setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Firebase auth state listener - only set up once after initialization
  useEffect(() => {
    if (!authInitialized || authListenerSetup.current) return;

    authListenerSetup.current = true;
    
    // Clean up any existing listener
    if (authListenerUnsubscribe.current) {
      authListenerUnsubscribe.current();
      authListenerUnsubscribe.current = null;
    }

    try {
      const unsubscribe = onAuthStateChanged(getAuth(), async (user: any) => {
        if (isProcessingAuthChange.current) {
          return;
        }

        // Add a small delay to ensure auth state is stable
        await new Promise(resolve => setTimeout(resolve, 100));

        isProcessingAuthChange.current = true;
        
        try {
          if (user) {
            // Only refresh token if we already have an authToken (user was logged in)
            if (authToken) {
              const token = await refreshAuthToken();
              if (!token) {
                await logout();
              }
            }
          } else {
            // Don't automatically logout when Firebase user is null
            // This allows for JWT-based authentication without Firebase user
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          // Don't logout on errors, just log them
        } finally {
          isProcessingAuthChange.current = false;
          setLoading(false);
        }
      });

      authListenerUnsubscribe.current = unsubscribe;
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
    }

    // Cleanup function
    return () => {
      if (authListenerUnsubscribe.current) {
        authListenerUnsubscribe.current();
        authListenerUnsubscribe.current = null;
      }
      authListenerSetup.current = false;
    };
  }, [authInitialized]); // Only depend on authInitialized, not authToken



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
      currentAuthToken.current = token;
      currentUserId.current = id;
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
      currentAuthToken.current = null;
      currentUserId.current = null;
      hasLoadedAuthData.current = false;
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
        const currentToken = await getIdToken(currentUser, false);
        
        // Decode the JWT token to get the expiration time
        const tokenPayload = JSON.parse(atob(currentToken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        
        // Only refresh if token will expire in the next 5 minutes
        if (expirationTime - currentTime <= 5 * 60 * 1000) {
          const newToken = await getIdToken(currentUser, true);
          console.log('Refreshing for newToken', newToken);
          await AsyncStorage.setItem('authToken', newToken);
          setAuthToken(newToken);
          return newToken;
        }
        
        // If token is still valid, return the current token
        return currentToken;
      }
      
      // If no current user but we have stored auth data, don't force logout
      // This allows for JWT-based authentication without Firebase user
      console.log('No Firebase user found, but keeping stored auth state');
      return authToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Don't automatically logout on token refresh errors
      return authToken;
    }
  };

  // Ensure we don't return null values if we have valid refs
  const stableAuthToken = currentAuthToken.current || authToken;
  const stableUserId = currentUserId.current || userId;
  
  return (
    <AuthContext.Provider 
      value={{ 
        authToken: stableAuthToken, 
        userId: stableUserId, 
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
    // During initialization, the context might not be available yet
    // Return a default state instead of throwing an error
    console.warn('useUserAuth called outside of UserProvider, returning default state');
    return {
      authToken: null,
      userId: null,
      loading: true,
      authInitialized: false,
      login: async () => { throw new Error('UserProvider not available'); },
      logout: async () => { throw new Error('UserProvider not available'); },
      refreshAuthToken: async () => { throw new Error('UserProvider not available'); },
    };
  }
  
  // Authentication state tracking (minimal logging)
  if (context.authToken && context.userId) {
    // User is authenticated - no logging needed
  }
  
  return context;
}; 