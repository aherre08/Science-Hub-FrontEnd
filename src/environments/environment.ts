// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8Rur6WhqnOkN7JZU_YKe90sCEn3zeZ4Y",
  authDomain: "tfg-bc0ed.firebaseapp.com",
  projectId: "tfg-bc0ed",
  storageBucket: "tfg-bc0ed.appspot.com",
  messagingSenderId: "150215234074",
  appId: "1:150215234074:web:3973cddbf374b96bfbb7a3",
  measurementId: "G-DFSB14BPB4"
};

export const environment = {
    production: false,
    firebaseConfig: {
      apiKey: 'AIzaSyD8Rur6WhqnOkN7JZU_YKe90sCEn3zeZ4Y',
      authDomain: 'tfg-bc0ed.firebaseapp.com',
      projectId: 'tfg-bc0ed',
      storageBucket: 'tfg-bc0ed.appspot.com',
      messagingSenderId: '150215234074',
      appId: '1:150215234074:web:3973cddbf374b96bfbb7a3'
    }
  };