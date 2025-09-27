import { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@/config/firebaseConfig';
import { onAuthStateChanged, getIdToken, signOut } from '@react-native-firebase/auth';
import mixpanel from '@/config/mixpanelConfig';

interface AuthContextType {
  authToken: string | null;
  userId: number | null;
  firebaseUid: string | null;
  loading: boolean;
  authInitialized: boolean;
  login: (token: string, id: number, firebaseUid: string, rememberMe: boolean, email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<string | null>;
  checkAndRefreshToken: () => Promise<boolean>;
  getTokenInfo: () => { createdAt: string; expiresAt: string; timeUntilExpiry: number; isValid: boolean } | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
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
  const currentFirebaseUid = useRef<string | null>(null);
  
  // Initialize auth state from AsyncStorage first
  useEffect(() => {
    const initializeAuth = async () => {
      await mixpanel.initMixpanel();
      try {
        const [storedToken, storedRememberMe, storedUserId, storedFirebaseUid] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('rememberMe'),
          AsyncStorage.getItem('userId'),
          AsyncStorage.getItem('firebaseUid'),
        ]);
        const rememberMeData = storedRememberMe ? JSON.parse(storedRememberMe) : null;

        console.log(`🔐 Auth Initialization:` +
          `\n  - Token: ${storedToken ? storedToken.substring(0, 10) + '...' + storedToken.substring(storedToken.length - 10) : 'null'}` +
          `\n  - UID: ${storedUserId}` +
          `\n  - Firebase UID: ${storedFirebaseUid}` +
          `\n  - Remember Me data: ${JSON.stringify(rememberMeData)}`
        );

        if (rememberMeData?.rememberMe && storedToken && storedUserId && storedFirebaseUid) {
          // rememberMe true: restore auth state
          console.log('🔐 Auth Initialization: rememberMe true, restoring auth state');
          setAuthToken(storedToken);
          setUserId(Number(storedUserId));
          setFirebaseUid(storedFirebaseUid);
          currentAuthToken.current = storedToken;
          currentUserId.current = Number(storedUserId);
          currentFirebaseUid.current = storedFirebaseUid;
          hasLoadedAuthData.current = true;
          
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
          const expirationTime = tokenPayload.exp * 1000;
          const currentTime = Date.now();
          // Check token expiration to determine if it needs refreshing
          if (expirationTime - currentTime <= 5 * 60 * 1000) {
            console.log('🔐 Auth Initialization: token needs refresh');
            await refreshAuthToken(storedToken);
          } else {
            scheduleTokenRefresh(storedToken);
          }
        } else {
          // rememberMe false
          console.log('🔐 Auth Initialization: rememberMe false, clearing auth state');
          await logout();
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
      } finally {
        console.log('🔐 Auth Initialization complete');
        setAuthInitialized(true);
      }
    };
    initializeAuth();
  }, []);

  // Enhanced Firebase auth state listener with automatic token refresh
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
            // Get fresh token from Firebase and schedule refresh
            const freshToken = await getIdToken(user, false);
            if (freshToken && freshToken !== authToken) {
              console.log(`🔐 Firebase auth state changed, updating token:\n  - Token: ${freshToken.substring(0, 10)}...${freshToken.substring(freshToken.length - 10)}\n  - Firebase UID: ${user.uid}\n  - Email: ${user.email}`);
              await AsyncStorage.setItem('authToken', freshToken);
              setAuthToken(freshToken);
              currentAuthToken.current = freshToken;
              
              // Schedule refresh for the new token
              scheduleTokenRefresh(freshToken);
              
              // Note: User ID should remain the same, but if it changes, 
              // the _layout.tsx useEffect will handle Mixpanel re-identification
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

  // Track Mixpanel events after auth initialization
  useEffect(() => {
    if (authInitialized) {
      if (firebaseUid) {
        mixpanel.identifyUser(firebaseUid);
        mixpanel.getPeopleSet({
          'uid_backend': userId?.toString() || '',
          'last_seen': new Date().toISOString(),
        });
        mixpanel.trackEvent('Session Started', {
          timestamp: new Date().toISOString(),
          type: 'auth_session',
          uid_backend: userId?.toString() || '',
        });
      } else {
        mixpanel.resetUser();
      }
    }
  }, [authInitialized, firebaseUid, userId]);

  const refreshAuthToken = async (existingToken?: string) => {
    try {
      console.log('🔄 refreshAuthToken called...');
      // Get React Native Firebase auth
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        // Check current token expiration time (use existing token if provided, otherwise fetch from AsyncStorage)
        const currentToken = existingToken || await AsyncStorage.getItem('authToken');
        if (!currentToken) {
          throw new Error('No auth token found in AsyncStorage or React state');
        }
        const tokenPayload = JSON.parse(atob(currentToken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000;
        const currentTime = Date.now();
        
        console.log(`🔄 Current Token expires in ${Math.round((expirationTime - currentTime) / 1000 / 60)} minutes` +
          `\n  - Token: ${currentToken.substring(0, 10)}...${currentToken.substring(currentToken.length - 10)}` +
          `\n  - Expires at: ${new Date(expirationTime).toLocaleString()}` +
          `\n  - Current time: ${new Date(currentTime).toLocaleString()}`
        );
        
        // Refresh token if it expires in the next 5 minutes
        if (expirationTime - currentTime <= 5 * 60 * 1000) {
          const newToken = await getIdToken(currentUser, true);
          if (newToken) {
            console.log(`🔄 New Token: ${newToken.substring(0, 10)}...${newToken.substring(newToken.length - 10)}`);
            await AsyncStorage.setItem('authToken', newToken);
            setAuthToken(newToken);
            currentAuthToken.current = newToken;
            console.log('🔄 New Token stored in AsyncStorage and React state');


            scheduleTokenRefresh(newToken);
            return newToken;
          }
        } else {
          console.log('🔄 Token is still valid, no refresh needed');
          return currentToken;
        }
      }
      // ❌ No Firebase user
      console.log('❌ No Firebase user found, clearing stored auth state');
      await logout();
      return null;
    } catch (error) {
      console.error('❌ Error refreshing token:', error);
      // Don't automatically logout on token refresh errors
      
      // Return existing token on error
      return authToken;
    }
  };

  // Schedule token refresh based on actual expiration time
  const scheduleTokenRefresh = (token: string) => {
    try {
      // Decode the JWT token to get the expiration time
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      // Calculate time until refresh (5 minutes before expiry)
      const refreshBuffer = 5 * 60 * 1000; // 5 minutes
      const timeUntilRefresh = expirationTime - currentTime - refreshBuffer;
      
      console.log('🔄 Token expires at:', new Date(expirationTime).toLocaleString(), '| Scheduling refresh in:', Math.round(timeUntilRefresh / 1000 / 60), 'minutes');
      
      if (timeUntilRefresh > 0) {
        // Schedule refresh for the future
        setTimeout(async () => {
          console.log('🔄 Scheduled token refresh triggered');
          await refreshAuthToken();
        }, timeUntilRefresh);
      } else {
        // Token needs immediate refresh
        console.log('🔐 Token needs immediate refresh');
        refreshAuthToken();
      }
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
    }
  };

  const login = async (token: string, id: number, firebaseUid: string, rememberMe: boolean, email: string) => {
    try {
      if (rememberMe) {
        // Store data for future restoration (keep me logged in)
        await Promise.all([
          AsyncStorage.setItem('authToken', token),
          AsyncStorage.setItem('userId', id.toString()),
          AsyncStorage.setItem('firebaseUid', firebaseUid),
          AsyncStorage.setItem('rememberMe', JSON.stringify({
            rememberMe,
            email: email
          }))
        ]);
        console.log(`🔐 Storing login data (keep me logged in):\n  - Token: ${token.substring(0, 10)}...${token.substring(token.length - 10)}\n  - User ID: ${id}\n  - Firebase UID: ${firebaseUid}\n  - Remember Me: ${rememberMe}\n  - Email: ${email}`);
      } else {
        // Don't store data, just set current session (don't keep me logged in)
        console.log(`🔐 Setting current session (don't keep me logged in):\n  - Token: ${token.substring(0, 10)}...${token.substring(token.length - 10)}\n  - User ID: ${id}\n  - Firebase UID: ${firebaseUid}\n  - Remember Me: ${rememberMe}\n  - Email: ${email}`);
      }
      
      setAuthToken(token);
      setUserId(id);
      setFirebaseUid(firebaseUid);
      currentAuthToken.current = token;
      currentUserId.current = id;
      currentFirebaseUid.current = firebaseUid;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase
      await signOut(getAuth());
      // Clear keys from AsyncStorage
      await AsyncStorage.clear();
      // Reset Mixpanel user data
      mixpanel.resetUser();
      // Reset auth React state
      setAuthToken(null);
      setUserId(null);
      setFirebaseUid(null);
      currentAuthToken.current = null;
      currentUserId.current = null;
      currentFirebaseUid.current = null;
      hasLoadedAuthData.current = false;
      console.log('🔐 Firebase logout, storage cleared, auth state reset, Mixpanel reset');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const checkAndRefreshToken = async (): Promise<boolean> => {
    if (!authToken) return false;
    
    try {
      console.log('🧪 Force refreshing token for testing...');
      
      // For testing, always force a refresh
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const newToken = await getIdToken(currentUser, true);
        console.log('🧪 Force refresh result:', newToken ? 'SUCCESS' : 'FAILED');
        
                 if (newToken) {
           // Decode the new token to get creation info
           const newTokenPayload = JSON.parse(atob(newToken.split('.')[1]));
           const newTokenCreatedAt = new Date(newTokenPayload.iat * 1000).toLocaleString();
           const newTokenExpiresAt = new Date(newTokenPayload.exp * 1000).toLocaleString();
           
           console.log('🔐 Token force refreshed successfully');
           console.log('🔐 New token created at:', newTokenCreatedAt);
           console.log('🔐 New token expires at:', newTokenExpiresAt);
           
           await AsyncStorage.setItem('authToken', newToken);
           setAuthToken(newToken);
           currentAuthToken.current = newToken;
           
           // Schedule refresh for the new token
           scheduleTokenRefresh(newToken);
           
           return true;
         }
      }
      
      return false;
    } catch (error) {
      console.error('Error force refreshing token:', error);
      return false;
    }
  };

  const getTokenInfo = () => {
    if (!authToken) return null;
    
    try {
      const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));
      const expirationTime = tokenPayload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      
      // Add detailed debugging
      console.log('🔍 Token Debug Info:');
      console.log('  - Token created at:', new Date(tokenPayload.iat * 1000).toLocaleString());
      console.log('  - Token expires at:', new Date(expirationTime).toLocaleString());
      console.log('  - Current time:', new Date(currentTime).toLocaleString());
      console.log('  - Time until expiry (ms):', timeUntilExpiry);
      console.log('  - Time until expiry (minutes):', Math.round(timeUntilExpiry / 1000 / 60));
      console.log('  - Token age (minutes):', Math.round((currentTime - tokenPayload.iat * 1000) / 1000 / 60));
      
      return {
        createdAt: new Date(tokenPayload.iat * 1000).toLocaleString(),
        expiresAt: new Date(expirationTime).toLocaleString(),
        timeUntilExpiry: Math.round(timeUntilExpiry / 1000 / 60), // minutes
        isValid: timeUntilExpiry > 0
      };
    } catch (error) {
      console.error('Error getting token info:', error);
      return null;
    }
  };

  // Ensure we don't return null values if we have valid refs
  const stableAuthToken = currentAuthToken.current || authToken;
  const stableUserId = currentUserId.current || userId;
  const stableFirebaseUid = currentFirebaseUid.current || firebaseUid;
  
  return (
    <AuthContext.Provider 
      value={{ 
        authToken: stableAuthToken, 
        userId: stableUserId, 
        firebaseUid: stableFirebaseUid,
        loading, 
        authInitialized,
        login, 
        logout,
        refreshAuthToken,
        checkAndRefreshToken,
        getTokenInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // During initialization, the context might not be available yet
    // Return a default state instead of throwing an error
    console.warn('useAuth called outside of AuthProvider, returning default state');
    return {
      authToken: null,
      userId: null,
      firebaseUid: null,
      loading: true,
      authInitialized: false,
      login: async () => { throw new Error('AuthProvider not available'); },
      logout: async () => { throw new Error('AuthProvider not available'); },
      refreshAuthToken: async () => { throw new Error('AuthProvider not available'); },
      checkAndRefreshToken: async () => { throw new Error('AuthProvider not available'); },
      getTokenInfo: () => null,
    };
  }
  
  // Authentication state tracking (minimal logging)
  if (context.authToken && context.userId) {
    // User is authenticated - no logging needed
  }
  
  return context;
}; 