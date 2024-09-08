// firebase.js
// Импорт функции из Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// Ключи конфигурации Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGvOMm510KgJMpbCyxQqEq3aajE-Wafgw",
    authDomain: "olimpiada-informatic.firebaseapp.com",
    projectId: "olimpiada-informatic",
    storageBucket: "olimpiada-informatic.appspot.com",
    messagingSenderId: "946061821959",
    appId: "1:946061821959:web:0539adc8a359bb7c7802a2",
    measurementId: "G-980CGTSJ4Y"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore
const db = getFirestore(app);

export { app, db };
