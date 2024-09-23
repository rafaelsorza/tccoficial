import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAXLSQwTz7WhoYNzEoK-MLLI2t6Nx9Fegk",
    authDomain: "vitalityvision-47186.firebaseapp.com",
    projectId: "vitalityvision-47186",
    storageBucket: "vitalityvision-47186.appspot.com",
    messagingSenderId: "1031713528053",
    appId: "1:1031713528053:web:fa6f0b9a6bbfb85442cdbc",
    measurementId: "G-5GT87VHZNE"
  };
  

const app = initializeApp(firebaseConfig);


 const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};