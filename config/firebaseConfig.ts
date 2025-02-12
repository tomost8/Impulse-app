// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

// Initialize Firebase Authentication, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };