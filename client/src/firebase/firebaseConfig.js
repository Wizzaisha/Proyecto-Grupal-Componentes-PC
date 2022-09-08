// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
    apiKey: "AIzaSyCASnxXvTupHPFoduuUbuajR6cw0DDfuzI",
    authDomain: "henry-p-f.firebaseapp.com",
    projectId: "henry-p-f",
    storageBucket: "henry-p-f.appspot.com",
    messagingSenderId: "489955529648",
    appId: "1:489955529648:web:dd31474e7d67d7f21d3c75",
    measurementId: "G-JCR8RSRLT1"
}; */
const firebaseConfig = {
    apiKey: "AIzaSyDPVcDD6Z04wMLaEeFOtwzZ3dgpe87HDFk",
    authDomain: "henry-hardware.firebaseapp.com",
    projectId: "henry-hardware",
    storageBucket: "henry-hardware.appspot.com",
    messagingSenderId: "273500046609",
    appId: "1:273500046609:web:dbb9025d707f1f9da078b0"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)