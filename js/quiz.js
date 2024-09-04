import { getFirestore, collection, doc, setDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { app } from 'js./auth.js'; // Импортируем уже инициализированный экземпляр Firebase

// Инициализация Firestore с использованием существующего экземпляра Firebase
const db = getFirestore(app);
const auth = getAuth(app);

// Функция для получения предмета из URL
function getSubject() {
    return 'math'; // Устанавливаем предмет как 'math' для упрощения
}

// Функция для сохранения данных в Firestore
async function saveAnswersToFirestore(email, answers) {
    try {
        const docRef = doc(collection(db, 'quizzes')); // Создает новый документ с уникальным идентификатором
        await setDoc(docRef, {
            email: email,
            subject: 'math', 
            answers: answers,
            timestamp: Timestamp.now() // Использует текущее время в формате Timestamp
        });
        console.log('Ответы успешно сохранены в Firestore!');
    } catch (e) {
        console.error('Ошибка при сохранении ответов в Firestore: ', e);
    }
}

// Сохранение ответов и переход к результатам
async function finishQuiz(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const subject = getSubject(); // Получаем предмет
    const userAnswers = {}; // Собираем ответы пользователя из формы

    // Перебираем все вопросы
    for (let i = 1; i <= 8; i++) {
        const questionElement = document.querySelector(`[name="question${i}"]:checked`); // Ищем выбранный ответ для вопроса
        const answer = questionElement ? questionElement.value : document.getElementById(`question-${i}`).value; // Получаем ответ
        userAnswers[i] = answer; // Сохраняем ответ в объект
    }

    // Получаем текущего пользователя
    const user = auth.currentUser;
    const userEmail = user ? user.email : 'unknown'; // Получаем email текущего пользователя

    // Сохраняем ответы в localStorage
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); 

    // Сохраняем ответы в Firestore
    await saveAnswersToFirestore(userEmail, userAnswers);

    // Переходим на страницу результатов
    window.location.href = 'results.html';
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
