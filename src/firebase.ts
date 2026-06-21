import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi3Y2ngDIhxvnKHPAym4_1DpekjZoLaWI",
  authDomain: "ai-studio-applet-webapp-b0758.firebaseapp.com",
  projectId: "ai-studio-applet-webapp-b0758",
  storageBucket: "ai-studio-applet-webapp-b0758.firebasestorage.app",
  messagingSenderId: "522566355693",
  appId: "1:522566355693:web:72778c36f7946f00805ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore with the exact custom database ID
export const db = getFirestore(app, "ai-studio-cb353601-d078-4c39-8a76-5b6d833e6811");
