// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJt5itkfd98xBCB0UHNHLa6rHJiTO5Nrs",
  authDomain: "expense-tracker-25a16.firebaseapp.com",
  projectId: "expense-tracker-25a16",
  storageBucket: "expense-tracker-25a16.appspot.com",
  messagingSenderId: "604969037659",
  appId: "1:604969037659:web:6872f58ff95663c206f47e",
  measurementId: "G-TFDBMHT46N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db= getFirestore(app);
const analytics = getAnalytics(app);