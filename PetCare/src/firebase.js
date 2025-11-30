// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFIPtf45SrMWYgLKjE8JqyTQhGqw0POJU",
  authDomain: "petcareadoptionsystem.firebaseapp.com",
  projectId: "petcareadoptionsystem",
  storageBucket: "petcareadoptionsystem.appspot.com",
  messagingSenderId: "272184303480",
  appId: "1:272184303480:web:1de1dc61cd9bb4a7a8328d",
  measurementId: "G-RRYST30JX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();