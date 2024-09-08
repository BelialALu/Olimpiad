import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Инициализация Firestore и Auth
const firestore = getFirestore();
const auth = getAuth();

async function saveAnswersToFirestore(subject, userAnswers) {
    try {
        const user = auth.currentUser;
        if (user) {
            const email = user.email;
            await addDoc(collection(firestore, 'quizzes'), {
                email,
                subject,
                answers: userAnswers,
                timestamp: new Date()
            });
            console.log('Данные успешно сохранены в Firestore');
        } else {
            console.error('Пользователь не авторизован');
        }
    } catch (error) {
        console.error('Ошибка сохранения данных в Firestore:', error);
    }
}

// Функция для получения предмета из URL
function getSubject() {
    return 'informatics'; // Устанавливаем предмет как 'informatics' для упрощения
}

// Сохранение ответов и переход к результатам
function finishQuiz(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const subject = getSubject(); // Получаем предмет
    const userAnswers = {}; // Собираем ответы пользователя из формы
    for (let i = 1; i <= 7; i++) {
        const answer = document.getElementById(`question-${i}`).value;
        userAnswers[i] = answer;
    }
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы в localStorage

    // Сохраняем ответы в Firestore
    saveAnswersToFirestore(subject, userAnswers);

    window.location.href = 'results.html'; // Переходим на страницу результатов
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
