import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvO-7BR5liAnoQsf21LojAqvZjFHlURzc",
  authDomain: "fir-learning-3ea02.firebaseapp.com",
  projectId: "fir-learning-3ea02",
  storageBucket: "fir-learning-3ea02.appspot.com",
  messagingSenderId: "916657642261",
  appId: "1:916657642261:web:32fb8ad4a7313691c9671c",
  measurementId: "G-3ZTXLK2W9H",
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {
    projectFirestore,
    timestamp
}