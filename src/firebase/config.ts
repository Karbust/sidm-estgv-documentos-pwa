// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDdB5WGrSBgQJQFiIS9P9uCIEJN0yizHuE",
  authDomain: "sidm-estgv.firebaseapp.com",
  databaseURL:
    "https://sidm-estgv-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sidm-estgv",
  storageBucket: "sidm-estgv.appspot.com",
  messagingSenderId: "181968804380",
  appId: "1:181968804380:web:484f4b3cda17694b40ddd9",
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

/*updateProfile(getAuth().currentUser!, {
    displayName: 'António'
}).then(() => console.log('Atualizado com sucesso.'))*/

export { firebaseApp, auth, db, firestore };
