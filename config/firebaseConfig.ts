// firebaseConfig.ts
// React Native Firebase configuration for v22

console.log('🔥 Firebase config loading (React Native Firebase SDK v22)...');

// Import the app module to trigger auto-initialization
import '@react-native-firebase/app';
import { getApps, getApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';

// Test Firebase initialization
try {
  const apps = getApps();
  console.log('🔥 Firebase apps available:', apps.length);
  
  if (apps.length > 0) {
    const defaultApp = getApp();
    console.log('✅ Firebase default app exists:', defaultApp.name);
    console.log('✅ Firebase project ID:', defaultApp.options.projectId);
  } else {
    console.log('❌ No Firebase apps found - this indicates an initialization issue');
  }
} catch (error) {
  console.error('❌ Error checking Firebase initialization:', error);
}

// Export Firebase services as functions (React Native Firebase v22 pattern)
// These should auto-initialize when Google Services files are present
export const getAuth = () => auth();
export const getFirestore = () => firestore();
export const getStorage = () => storage();
export const getCrashlytics = () => crashlytics();

// For backward compatibility, also export the modules directly
export { auth, firestore, storage, crashlytics };

// Default export
export default {
  auth,
  firestore,
  storage,
  crashlytics,
  getAuth,
  getFirestore,
  getStorage,
  getCrashlytics
};