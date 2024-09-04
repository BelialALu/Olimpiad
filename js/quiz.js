// Функция для получения предмета из URL
function getSubject() {
    return 'informatics'; // Устанавливаем предмет как 'informatics' для упрощения
}

// Сохранение ответов и переход к результатам
function finishQuiz(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const subject = getSubject(); // Получаем предмет
    const userAnswers = {}; // Собираем ответы пользователя из формы

    // Перебираем все вопросы
    for (let i = 1; i <= 8; i++) {
        const questionElement = document.querySelector(`[name="question${i}"]:checked`); // Ищем выбранный ответ для вопроса
        const answer = questionElement ? questionElement.value : document.getElementById(`question-${i}`).value; // Получаем ответ
        userAnswers[i] = answer; // Сохраняем ответ в объект
    }

    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = 'results.html'; // Переходим на страницу результатов
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
