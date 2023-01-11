// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyC5eJWRW3_sbvuv9mHHx8bhl4r9wTSVPM8",
  authDomain: "lithe-lens-363220.firebaseapp.com",
  projectId: "lithe-lens-363220",
  storageBucket: "lithe-lens-363220.appspot.com",
  messagingSenderId: "773423121633",
  appId: "1:773423121633:web:39bab355ab8aa7fb6963a0",
  measurementId: "G-YV07LNMLKW"
};

firebase.initializeApp(firebaseConfig)
const db = firestore.getFirestore()
module.exports = {
  db,
  userRef : firestore.collection(db, 'user')
}

