// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGvOMm510KgJMpbCyxQqEq3aajE-Wafgw",
  authDomain: "olimpiada-informatic.firebaseapp.com",
  projectId: "olimpiada-informatic",
  storageBucket: "olimpiada-informatic.appspot.com",
  messagingSenderId: "946061821959",
  appId: "1:946061821959:web:0539adc8a359bb7c7802a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Вход пользователя
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Успешный вход!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Ошибка входа: ' + error.message);
        });
});

// Регистрация пользователя
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Регистрация успешна!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Ошибка регистрации: ' + error.message);
        });
});

// Logout пользователя
function logout() {
    firebase.auth().signOut().then(() => {
        alert('Вы вышли из системы.');
        window.location.href = 'index.html';
    }).catch((error) => {
        alert('Ошибка при выходе: ' + error.message);
    });
}
