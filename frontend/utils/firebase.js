// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "virtual-lms-b8146.firebaseapp.com",
  projectId: "virtual-lms-b8146",
  storageBucket: "virtual-lms-b8146.firebasestorage.app",
  messagingSenderId: "323452464371",
  appId: "1:323452464371:web:0a6d116e82043e41cedb86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider }