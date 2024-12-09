// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgx6ZtXi-ysazmfbrFuxzbuqkT68OD6So",
  authDomain: "iotwise-demo.firebaseapp.com",
  databaseURL: "https://iotwise-demo-default-rtdb.firebaseio.com",
  projectId: "iotwise-demo",
  storageBucket: "iotwise-demo.appspot.com",
  messagingSenderId: "447043402909",
  appId: "1:447043402909:web:778f8428c4ba04baa86874",
  measurementId: "G-C19CHW7HM5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp