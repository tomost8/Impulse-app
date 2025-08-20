// Simple Firebase test script
// Run this with: node test-firebase.js

console.log('Testing Firebase imports...');

try {
  // Test basic Firebase imports
  const auth = require('@react-native-firebase/auth');
  const firestore = require('@react-native-firebase/firestore');
  const storage = require('@react-native-firebase/storage');
  const crashlytics = require('@react-native-firebase/crashlytics');
  
  console.log('✅ All Firebase modules imported successfully');
  console.log('auth:', typeof auth.default);
  console.log('firestore:', typeof firestore.default);
  console.log('storage:', typeof storage.default);
  console.log('crashlytics:', typeof crashlytics.default);
  
} catch (error) {
  console.error('❌ Firebase import error:', error.message);
}
