// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3uEH-fhueuXLXpbnCKJJQT20k6VtZ8RQ",
  authDomain: "onext-a32af.firebaseapp.com",
  projectId: "onext-a32af",
  storageBucket: "onext-a32af.appspot.com",
  messagingSenderId: "643908502095",
  appId: "1:643908502095:web:87381d94bbd966ae59203a",
  measurementId: "G-0V5YHRB7M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default app;