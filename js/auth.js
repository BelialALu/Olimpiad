import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Инициализация Firebase
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
const auth = getAuth(app);

// Вход пользователя
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
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

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Регистрация успешна!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Ошибка регистрации: ' + error.message);
        });
});

// Открытие модального окна для сброса пароля
document.getElementById('forgotPasswordBtn')?.addEventListener('click', () => {
    document.getElementById('forgotPasswordModal').style.display = 'block';
});

// Закрытие модального окна
document.getElementById('closeModalBtn')?.addEventListener('click', () => {
    document.getElementById('forgotPasswordModal').style.display = 'none';
});

// Сброс пароля
document.getElementById('resetPasswordBtn')?.addEventListener('click', () => {
    const email = document.getElementById('resetEmail').value;
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Инструкции по сбросу пароля отправлены на указанный email.');
                document.getElementById('forgotPasswordModal').style.display = 'none';
            })
            .catch((error) => {
                alert('Ошибка: ' + error.message);
            });
    } else {
        alert('Пожалуйста, введите email.');
    }
});

// Logout пользователя
window.logout = () => {
    signOut(auth).then(() => {
        alert('Вы вышли из системы.');
        window.location.href = 'index.html';
    }).catch((error) => {
        alert('Ошибка при выходе: ' + error.message);
    });
}
