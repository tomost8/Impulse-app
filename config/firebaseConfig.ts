// firebaseConfig.ts
// React Native Firebase configuration for v22

console.log('🔥 Firebase config loading (React Native Firebase SDK v22)...');

// Import the app module to trigger auto-initialization
import '@react-native-firebase/app';
import { getApps, getApp } from '@react-native-firebase/app';
import { getAuth as getFirebaseAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';
import { getCrashlytics } from '@react-native-firebase/crashlytics';

// Test Firebase initialization
/*
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
*/

// Export Firebase services using the new modular API (React Native Firebase v22 pattern)
// These should auto-initialize when Google Services files are present
export const getAuth = () => getFirebaseAuth();
export const getFirestoreInstance = () => getFirestore();
export const getStorageInstance = () => getStorage();
export const getCrashlyticsInstance = () => getCrashlytics();

// For backward compatibility, also export the modules directly
export { getFirebaseAuth as auth, getFirestore as firestore, getStorage as storage, getCrashlytics as crashlytics };

// Default export
export default {
  auth: getFirebaseAuth,
  firestore: getFirestore,
  storage: getStorage,
  crashlytics: getCrashlytics,
  getAuth,
  getFirestore: getFirestoreInstance,
  getStorage: getStorageInstance,
  getCrashlytics: getCrashlyticsInstance
};