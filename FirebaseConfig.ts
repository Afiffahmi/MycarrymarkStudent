// Import the functions you need from the SDKs you need
import { initializeAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-8g2U6ww4vwzUO_ymeC_do8utk3zEM0c",
  authDomain: "mycarrymark.firebaseapp.com",
  projectId: "mycarrymark",
  storageBucket: "mycarrymark.appspot.com",
  messagingSenderId: "931718460358",
  appId: "1:931718460358:web:724ed232db50500702b8c7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);
