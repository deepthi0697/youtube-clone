// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, onAuthStateChanged, User, GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4b8Ts_lCNNJ4ShQCzOjVs4o5yIz-GFzI",
  authDomain: "yt-clone-60bf6.firebaseapp.com",
  projectId: "yt-clone-60bf6",
  appId: "1:487528164025:web:accb5e9339af81bab44968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider())
}

export function signOut(){
    return auth.signOut()
}

export function onAuthStateChangedHelper(callback: (user:User | null ) => void){
    return onAuthStateChanged(auth,callback)
}