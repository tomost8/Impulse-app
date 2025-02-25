// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//AsyncStorage.clear();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfwDZ1u34v9EW8WjRpRlDHIwnbkTHt4s4",
  authDomain: "quizdemov1.firebaseapp.com",
  projectId: "quizdemov1",
  storageBucket: "quizdemov1.appspot.com",
  messagingSenderId: "792210030232",
  appId: "1:792210030232:web:8a4c73571761bcc6539aed",
  measurementId: "G-4RNXMWZQPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };