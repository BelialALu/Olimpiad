// auth.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Ваши конфигурационные данные Firebase
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
const auth = getAuth(app);

// Регистрация пользователя
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Регистрация успешна!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Ошибка регистрации: ' + error.message);
  }
});

// Вход пользователя
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Успешный вход!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Ошибка входа: ' + error.message);
  }
});
