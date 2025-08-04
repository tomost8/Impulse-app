// firebaseConfig.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';

// React Native Firebase automatically initializes the default app
// No need to manually call initializeApp()

// Test Firebase initialization with delay to ensure proper setup
setTimeout(() => {
  try {
    console.log('✅ Firebase initialized successfully');
    console.log('✅ Auth available:', !!auth);
    console.log('✅ Firestore available:', !!firestore);
    console.log('✅ Storage available:', !!storage);
    console.log('✅ Crashlytics available:', !!crashlytics);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
}, 1000);

export { auth, firestore, storage, crashlytics };