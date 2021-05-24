import firebase from 'firebase/app';
import 'firebase/auth';
import  'firebase/analytics';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  };

export default function initFirebase(){
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig)
        console.log('Connected to firebase');
    }
}