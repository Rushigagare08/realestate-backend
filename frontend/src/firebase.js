// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-fc2c5.firebaseapp.com",
  projectId: "realestate-fc2c5",
  storageBucket: "realestate-fc2c5.firebasestorage.app",   // ✅ FIXED — correct bucket
  messagingSenderId: "107929992186",
  appId: "1:107929992186:web:4aec438ea4e54379560243"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Storage
export const storage = getStorage(app);   // use this in uploads
