// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1PHCbEYYl7N5UOVW8grUjbH_G4dC8DOw",
    authDomain: "spending-40188.firebaseapp.com",
    projectId: "spending-40188",
    storageBucket: "spending-40188.appspot.com",
    messagingSenderId: "136526438533",
    appId: "1:136526438533:web:b59e5e48019ee2229d89ec",
    measurementId: "G-P918MZLHQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };