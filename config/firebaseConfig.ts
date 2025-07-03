/*
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';

//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';


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

// Initialize Crashlytics
crashlytics().log('App mounted.');

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, crashlytics };
*/

// firebaseConfig.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';

// Initialize Crashlytics
crashlytics().log('App mounted.');

export { auth, firestore, storage, crashlytics };