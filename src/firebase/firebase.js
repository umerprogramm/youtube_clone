import firebase from 'firebase/compat/app';
import {
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';
import 'firebase/compat/storage'; // Import the storage module



const firebaseConfig = {
  apiKey: "AIzaSyBDv_AkdG1f9AVKLUXlkrY_PIE58JMCM9o",
  authDomain: "clone-65477.firebaseapp.com",
  projectId: "clone-65477",
  storageBucket: "clone-65477.appspot.com",
  messagingSenderId: "322772998651",
  appId: "1:322772998651:web:efc68a505d6b579613d35e",
  measurementId: "G-W4KBWNP9M8"
  };


firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
export { auth, provider  ,storageRef  };