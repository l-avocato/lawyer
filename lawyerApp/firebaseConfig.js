// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHCJduRp8gSWc5pYhOCCd6_xlWZkZX-dg",
  authDomain: "l-avocato-7fd6f.firebaseapp.com",
  databaseURL: "https://l-avocato-7fd6f-default-rtdb.firebaseio.com",
  projectId: "l-avocato-7fd6f",
  storageBucket: "l-avocato-7fd6f.appspot.com",
  messagingSenderId: "609527487048",
  appId: "1:609527487048:web:f704e0a85c615b52fad67d",
  measurementId: "G-2W2BL7VY77"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);