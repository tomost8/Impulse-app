import '@react-native-firebase/app';
import { getAuth as getFirebaseAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';
import { getCrashlytics } from '@react-native-firebase/crashlytics';

export const getAuth = () => getFirebaseAuth();
export const getFirestoreInstance = () => getFirestore();
export const getStorageInstance = () => getStorage();
export const getCrashlyticsInstance = () => getCrashlytics();

export { getFirebaseAuth as auth, getFirestore as firestore, getStorage as storage, getCrashlytics as crashlytics };

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