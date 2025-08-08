// firebaseConfig.ts
// React Native Firebase automatically initializes the default app
// No need to manually call initializeApp()

console.log('🔥 Firebase config loading...');

// Use dynamic imports to delay Firebase module loading
let auth: any = null;
let firestore: any = null;
let storage: any = null;
let crashlytics: any = null;

// Initialize Firebase modules after a delay
const initializeFirebase = () => {
  return new Promise((resolve) => {
    const checkFirebaseReady = () => {
      try {
        console.log('🔥 Testing Firebase initialization...');
        
        // Test actual Firebase functionality first
        console.log('🔥 Attempting to access Firebase app...');
        
        // Try to access the native Firebase directly
        const { NativeModules } = require('react-native');
        console.log('🔥 Native modules available:', Object.keys(NativeModules));
        
        if (NativeModules.RNFirebaseApp) {
          console.log('✅ RNFirebaseApp native module found');
        } else {
          console.log('❌ RNFirebaseApp native module not found');
        }
        
        const { getApp } = require('@react-native-firebase/app');
        console.log('🔥 getApp function available:', !!getApp);
        
        // Check if any apps exist
        const { getApps } = require('@react-native-firebase/app');
        const apps = getApps();
        console.log('🔥 Available Firebase apps:', apps.length);
        
        if (apps.length === 0) {
          console.log('⏳ No Firebase apps available yet, waiting...');
          setTimeout(checkFirebaseReady, 500);
          return;
        }
        
        const app = getApp(); // Use new modular API
        console.log('✅ Firebase app instance:', app.name);
        console.log('✅ Firebase app options:', app.options);
        
        // Now load the modules
        auth = require('@react-native-firebase/auth').default;
        firestore = require('@react-native-firebase/firestore').default;
        storage = require('@react-native-firebase/storage').default;
        crashlytics = require('@react-native-firebase/crashlytics').default;
        
        console.log('✅ Firebase modules loaded successfully');
        console.log('✅ Auth module:', !!auth);
        console.log('✅ Firestore module:', !!firestore);
        console.log('✅ Storage module:', !!storage);
        console.log('✅ Crashlytics module:', !!crashlytics);
        resolve(true);
        
      } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        console.log('⏳ Retrying in 500ms...');
        setTimeout(checkFirebaseReady, 500);
      }
    };
    
    // Start checking after initial delay
    setTimeout(checkFirebaseReady, 2000);
  });
};

// Start initialization immediately
initializeFirebase().then((success) => {
  if (success) {
    console.log('🎉 Firebase initialization completed successfully!');
  } else {
    console.log('❌ Firebase initialization failed!');
  }
});

// Export getter functions that wait for initialization
export const getAuth = () => {
  if (!auth) {
    // Wait for initialization to complete
    return new Promise((resolve) => {
      const checkAuth = () => {
        if (auth) {
          resolve(auth);
        } else {
          setTimeout(checkAuth, 100);
        }
      };
      checkAuth();
    });
  }
  return Promise.resolve(auth);
};

export const getFirestore = () => {
  if (!firestore) {
    return new Promise((resolve) => {
      const checkFirestore = () => {
        if (firestore) {
          resolve(firestore);
        } else {
          setTimeout(checkFirestore, 100);
        }
      };
      checkFirestore();
    });
  }
  return Promise.resolve(firestore);
};

export const getStorage = () => {
  if (!storage) {
    return new Promise((resolve) => {
      const checkStorage = () => {
        if (storage) {
          resolve(storage);
        } else {
          setTimeout(checkStorage, 100);
        }
      };
      checkStorage();
    });
  }
  return Promise.resolve(storage);
};

export const getCrashlytics = () => {
  if (!crashlytics) {
    return new Promise((resolve) => {
      const checkCrashlytics = () => {
        if (crashlytics) {
          resolve(crashlytics);
        } else {
          setTimeout(checkCrashlytics, 100);
        }
      };
      checkCrashlytics();
    });
  }
  return Promise.resolve(crashlytics);
};

// Also export direct references for backwards compatibility
export { auth, firestore, storage, crashlytics };