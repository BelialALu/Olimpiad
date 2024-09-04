// Инициализация Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDGvOMm510KgJMpbCyxQqEq3aajE-Wafgw",
  authDomain: "olimpiada-informatic.firebaseapp.com",
  projectId: "olimpiada-informatic",
  storageBucket: "olimpiada-informatic.appspot.com",
  messagingSenderId: "946061821959",
  appId: "1:946061821959:web:0539adc8a359bb7c7802a2",
  measurementId: "G-980CGTSJ4Y"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Получаем ссылку на авторизацию
var auth = firebase.auth();

// Вход пользователя
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Пожалуйста, введите email и пароль.');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed in:', userCredential);
            alert('Успешный вход!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            alert('Ошибка входа: ' + error.message);
        });
});

// Регистрация пользователя
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Пожалуйста, введите email и пароль.');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User registered:', userCredential);
            alert('Регистрация успешна!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            alert('Ошибка регистрации: ' + error.message);
        });
});

// Logout пользователя
function logout() {
    auth.signOut().then(() => {
        alert('Вы вышли из системы.');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
        alert('Ошибка при выходе: ' + error.message);
    });
}
