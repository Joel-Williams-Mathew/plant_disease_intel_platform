
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDqZf_f89u1kkki45J2lRrpQZWFjRxk2SI",
  authDomain: "plant-leaf-network.firebaseapp.com",
  projectId: "plant-leaf-network",
  storageBucket: "plant-leaf-network.firebasestorage.app",
  messagingSenderId: "263194552796",
  appId: "1:263194552796:web:7c6d2b0a325df54b304719",
  measurementId: "G-H22QMKCSS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();