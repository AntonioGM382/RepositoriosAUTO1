// ./src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCUWTEPffYMTMDPudiQ3SCYTp4Uefyk4DA",
  authDomain: "goodweight-c8a20.firebaseapp.com",
  projectId: "goodweight-c8a20",
  storageBucket: "goodweight-c8a20.appspot.com",
  messagingSenderId: "676904535539",
  appId: "1:676904535539:web:cea64f356b96fc5983fe86",
  measurementId: "G-LJ041TYG6F"
};
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const storage = getStorage(FIREBASE_APP)

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);