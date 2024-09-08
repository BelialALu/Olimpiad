// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDGvOMm510KgJMpbCyxQqEq3aajE-Wafgw",
    authDomain: "olimpiada-informatic.firebaseapp.com",
    projectId: "olimpiada-informatic",
    storageBucket: "olimpiada-informatic.appspot.com",
    messagingSenderId: "946061821959",
    appId: "1:946061821959:web:0539adc8a359bb7c7802a2",
    measurementId: "G-980CGTSJ4Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc };
