import { db, collection, addDoc } from './firebase.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Функция для получения предмета из URL
function getSubject() {
    return 'math'; // Устанавливаем предмет как 'math' для упрощения
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

    const user = getAuth().currentUser;

    if (user) {
        // Отправляем данные в Firestore
        try {
            await addDoc(collection(db, 'olimpiad_math'), {
                email: user.email,
                answers: userAnswers,
                subject: subject,
                timestamp: new Date()
            });
            console.log('Результаты успешно отправлены в Firestore');
        } catch (error) {
            console.error('Ошибка при отправке данных в Firestore: ', error);
        }
    } else {
        console.warn('Пользователь не авторизован');
    }

    // Сохраняем ответы в localStorage
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));
    window.location.href = 'results.html'; // Переходим на страницу результатов
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
