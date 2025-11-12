// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaXTytTO5yRPz-BoYkQyFwQTB3xHI1CHY",
  authDomain: "civix-1cc4f.firebaseapp.com",
  projectId: "civix-1cc4f",
  storageBucket: "civix-1cc4f.firebasestorage.app",
  messagingSenderId: "77811739543",
  appId: "1:77811739543:web:a47370458e73cb907fb2d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);