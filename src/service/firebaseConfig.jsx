// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-planner-9d8d7.firebaseapp.com",
  projectId: "travel-planner-9d8d7",
  storageBucket: "travel-planner-9d8d7.appspot.com",
  messagingSenderId: "237963713895",
  appId: "1:237963713895:web:585cd9bc0714ebd762a3c2",
  measurementId: "G-W8C0BQCFPY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
// const analytics = getAnalytics(app);