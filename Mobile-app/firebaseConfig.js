// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnzR9wipIDrnWZW5gQQpp2IRe7a4dMiAU",
  authDomain: "edu-hub-a321e.firebaseapp.com",
  projectId: "edu-hub-a321e",
  storageBucket: "edu-hub-a321e.appspot.com",
  messagingSenderId: "923408910006",
  appId: "1:923408910006:web:1dc683fb8e83b56d180817",
  measurementId: "G-E3G18BKPQK"
};

let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const userRef = collection(db, 'Students');
