import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-tc4ffRBMXwnECpAm00KoXpSsjXEkkEE",
  authDomain: "dangdange-16cc2.firebaseapp.com",
  projectId: "dangdange-16cc2",
  storageBucket: "dangdange-16cc2.firebasestorage.app",
  messagingSenderId: "560972189472",
  appId: "1:560972189472:web:1d4d4314b1d4c1830d9145",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
