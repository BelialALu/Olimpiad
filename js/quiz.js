// quiz.js
import { app, db } from 'js./firebase.js'; // Путь к файлу firebase.js
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// Функция для сохранения результатов в Firestore
async function saveResults(email, answers, subject) {
    try {
        const resultsRef = collection(db, 'olimpiad_math');
        await addDoc(resultsRef, {
            email: email,
            answers: answers,
            subject: subject,
            timestamp: new Date() // Добавляет текущую дату и время
        });
        console.log('Результаты успешно сохранены');
    } catch (e) {
        console.error('Ошибка при сохранении результатов: ', e);
    }
}

// Функция для завершения теста
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

    // Сохраняем ответы в localStorage
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers));

    // Сохранение в Firestore
    const email = document.getElementById('userEmail').value; // Получаем email из скрытого поля
    await saveResults(email, userAnswers, subject);

    window.location.href = 'results.html'; // Переходим на страницу результатов
}

// Убедитесь, что ваш обработчик привязан к форме
document.getElementById('quizForm').addEventListener('submit', finishQuiz);
