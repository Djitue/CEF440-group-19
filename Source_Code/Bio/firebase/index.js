// firebase/index.js

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXsEXRMpQVNLm3BIbZTiDM1-anxRTP5s8",
  authDomain: "bio-attedendance-system.firebaseapp.com",
  projectId: "bio-attedendance-system",
  storageBucket: "bio-attedendance-system.appspot.com",
  messagingSenderId: "645464446249",
  appId: "1:645464446249:web:cc96665f5471a3c3429338",
  measurementId: "G-G1WLFM50E9",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use the already initialized app
}

//Initialize Firebase Auth with persistence
let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app); // Use the already initialized auth instance
}

// Initialize Firestore
const db = getFirestore(app);

export {
  auth,
  firebaseConfig,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential,
};
