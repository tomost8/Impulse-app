// firebaseConfig.ts
// React Native Firebase configuration

console.log('🔥 Firebase config loading (React Native Firebase SDK)...');

// Lazy loading to prevent initialization issues
let _auth: any = null;
let _firestore: any = null;
let _storage: any = null;
let _crashlytics: any = null;

// Create an auth wrapper that provides the expected API
const createAuthWrapper = () => {
  const authModule = require('@react-native-firebase/auth').default;
  
  // Return a function that when called returns the auth instance with all methods
  const authWrapper = () => {
    const authInstance = authModule();
    
    // Add the authentication methods to the instance
    return {
      ...authInstance,
      // Core auth methods
      signInWithEmailAndPassword: (email: string, password: string) => 
        authModule().signInWithEmailAndPassword(email, password),
      createUserWithEmailAndPassword: (email: string, password: string) => 
        authModule().createUserWithEmailAndPassword(email, password),
      signOut: () => authModule().signOut(),
      sendPasswordResetEmail: (email: string) => 
        authModule().sendPasswordResetEmail(email),
      
      // State management
      onAuthStateChanged: (callback: any) => authModule().onAuthStateChanged(callback),
      
      // User properties
      currentUser: authModule().currentUser,
    };
  };
  
  return authWrapper;
};

// Export getter functions for consistency with previous API
export const getAuth = () => {
  if (!_auth) {
    console.log('🔥 Lazy loading React Native Firebase Auth');
    _auth = createAuthWrapper();
  }
  return _auth;
};

export const getFirestore = () => {
  if (!_firestore) {
    console.log('🔥 Lazy loading React Native Firebase Firestore');
    const firestore = require('@react-native-firebase/firestore').default;
    _firestore = firestore;
  }
  return _firestore;
};

export const getStorage = () => {
  if (!_storage) {
    console.log('🔥 Lazy loading React Native Firebase Storage');
    const storage = require('@react-native-firebase/storage').default;
    _storage = storage;
  }
  return _storage;
};

export const getCrashlytics = () => {
  if (!_crashlytics) {
    console.log('🔥 Lazy loading React Native Firebase Crashlytics');
    const crashlytics = require('@react-native-firebase/crashlytics').default;
    _crashlytics = crashlytics;
  }
  return _crashlytics;
};

// Export direct references for backwards compatibility
export const auth = getAuth;
export const firestore = getFirestore;
export const storage = getStorage;
export const crashlytics = getCrashlytics;

// Initialize Firebase function
export const initializeFirebase = async () => {
  try {
    const authInstance = getAuth();
    console.log('🔥 React Native Firebase initialization complete');
    console.log('🔥 Auth state:', authInstance().currentUser ? 'User signed in' : 'No user');
    return true;
  } catch (error) {
    console.error('🔥 Firebase initialization error:', error);
    return false;
  }
};

// Default export to satisfy module requirements
export default {
  getAuth,
  getFirestore,
  getStorage,
  getCrashlytics,
  auth,
  firestore,
  storage,
  crashlytics,
  initializeFirebase
};