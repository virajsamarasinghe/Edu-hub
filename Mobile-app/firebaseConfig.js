
  // firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence,initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAQifPpFI3scmzaAONZK3GY_EO4kTyzJu4",
    authDomain: "edu-hub-6ebfb.firebaseapp.com",
    projectId: "edu-hub-6ebfb",
    storageBucket: "edu-hub-6ebfb.appspot.com",
    messagingSenderId: "525770797906",
    appId: "1:525770797906:web:37db98b1cd08481563c08b",
    measurementId: "G-XWTSQ1E2YB"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
