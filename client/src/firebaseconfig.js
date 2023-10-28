import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHCJduRp8gSWc5pYhOCCd6_xlWZkZX-dg",
  authDomain: "l-avocato-7fd6f.firebaseapp.com",
  databaseURL: "https://l-avocato-7fd6f-default-rtdb.firebaseio.com",
  projectId: "l-avocato-7fd6f",
  storageBucket: "l-avocato-7fd6f.appspot.com",
  messagingSenderId: "609527487048",
  appId: "1:609527487048:web:b6bba36309077adbfad67d",
  measurementId: "G-VBYHLDEW3Y"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);