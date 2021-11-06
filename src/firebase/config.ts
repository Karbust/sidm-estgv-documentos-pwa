// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASEURL,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
}

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)
const firestore = getFirestore(firebaseApp)

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        console.log('We are authenticated now!')
    }

    // Do other things
})
export { firebaseApp, auth, db, firestore }
