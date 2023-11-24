// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6wPPVRB36nArcHz3P_Gy7iFS17ImrZ2Y",
  authDomain: "itts-crossplatform.firebaseapp.com",
  projectId: "itts-crossplatform",
  storageBucket: "itts-crossplatform.appspot.com",
  messagingSenderId: "559774017391",
  appId: "1:559774017391:web:fdcfe6e1671c3d3a4d6a9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
