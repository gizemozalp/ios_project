// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEAWGOW8Yft7CNydwmTa2jb4xf4TTLnJY",
  authDomain: "login-cc72c.firebaseapp.com",
  projectId: "login-cc72c",
  storageBucket: "login-cc72c.appspot.com",
  messagingSenderId: "335481597717",
  appId: "1:335481597717:web:f8c48fe0830c509935431c"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {auth};