// firebaseConfig.ts
// Mock Firebase configuration to prevent initialization errors

console.log('🔥 Firebase config loading (mock mode)...');

// Mock Firebase modules to prevent initialization errors
const mockAuth = () => ({
  onAuthStateChanged: (callback: any) => {
    console.log('Mock auth state listener');
    return () => {};
  },
  currentUser: null,
  signInWithEmailAndPassword: async (email: string, password: string) => {
    throw new Error('Firebase Auth not available in mock mode');
  },
  signOut: async () => {
    console.log('Mock sign out');
  }
});

const mockFirestore = () => ({
  collection: (path: string) => ({
    doc: (id: string) => ({
      get: async () => ({ data: () => null, exists: false }),
      set: async (data: any) => ({ id }),
      update: async (data: any) => ({ id }),
      delete: async () => ({ id })
    }),
    add: async (data: any) => ({ id: 'mock-id' }),
    where: () => mockFirestore(),
    orderBy: () => mockFirestore(),
    limit: () => mockFirestore(),
    get: async () => ({ docs: [], empty: true })
  })
});

const mockStorage = () => ({
  ref: (path: string) => ({
    putFile: async (filePath: string) => ({
      ref: { getDownloadURL: async () => 'mock-url' }
    }),
    getDownloadURL: async () => 'mock-url'
  })
});

const mockCrashlytics = () => ({
  log: (message: string) => console.log('Mock crashlytics:', message),
  recordError: (error: any) => console.log('Mock crashlytics error:', error)
});

// Export getter functions that return mock modules
export const getAuth = () => {
  console.log('🔥 Using mock Firebase Auth');
  return mockAuth;
};

export const getFirestore = () => {
  console.log('🔥 Using mock Firebase Firestore');
  return mockFirestore;
};

export const getStorage = () => {
  console.log('🔥 Using mock Firebase Storage');
  return mockStorage;
};

export const getCrashlytics = () => {
  console.log('🔥 Using mock Firebase Crashlytics');
  return mockCrashlytics;
};

// Export direct references for backwards compatibility
export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
export const crashlytics = getCrashlytics();

// Initialize Firebase function (does nothing in mock mode)
export const initializeFirebase = async () => {
  console.log('🔥 Mock Firebase initialization complete');
  return true;
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