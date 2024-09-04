// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGvOMm510KgJMpbCyxQqEq3aajE-Wafgw",
  authDomain: "olimpiada-informatic.firebaseapp.com",
  projectId: "olimpiada-informatic",
  storageBucket: "olimpiada-informatic.appspot.com",
  messagingSenderId: "946061821959",
  appId: "1:946061821959:web:0539adc8a359bb7c7802a2"
};
firebase.initializeApp(firebaseConfig);

// Регистрация пользователя
document.getElementById('registrationForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert('Регистрация успешна!');
    window.location.href = 'login.html'; // Перенаправление на страницу входа
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
    await firebase.auth().signInWithEmailAndPassword(email, password);
    alert('Вход успешен!');
    window.location.href = 'index.html'; // Перенаправление на главную страницу
  } catch (error) {
    alert('Ошибка входа: ' + error.message);
  }
});
