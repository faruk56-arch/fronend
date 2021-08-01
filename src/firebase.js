import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBzCUY0oPC0yBPJQzrSHAUsN0KXOA7rdSg",
    authDomain: "whats-5aef9.firebaseapp.com",
    projectId: "whats-5aef9",
    storageBucket: "whats-5aef9.appspot.com",
    messagingSenderId: "767082250856",
    appId: "1:767082250856:web:b42dc175d07e1e17ca31dd",
    measurementId: "G-9TQGZ7X5KN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;