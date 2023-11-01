import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCeFCCoWWOQtb9wCQNu5frbBnFPgXLkeHQ",
    authDomain: "chat-react-67334.firebaseapp.com",
    projectId: "chat-react-67334",
    storageBucket: "chat-react-67334.appspot.com",
    messagingSenderId: "809404201794",
    appId: "1:809404201794:web:dbdc497989b6dc2202e6db"
  };

  const app = initializeApp(firebaseConfig)
  

export const auth = getAuth(app)
export const db = getFirestore(app)