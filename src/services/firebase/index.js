import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAud7R5FiCbUC9Mz1qfMDIRHAvO8NDVeSk",
    authDomain: "womanup-8689c.firebaseapp.com",
    projectId: "womanup-8689c",
    storageBucket: "womanup-8689c.appspot.com",
    messagingSenderId: "298140935356",
    appId: "1:298140935356:web:7716b139bae75db9f25cb9",
    measurementId: "G-3425X20ECY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);