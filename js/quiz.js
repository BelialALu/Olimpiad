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
    localStorage.setItem(`quizAnswers_${subject}`, JSON.stringify(userAnswers)); // Сохраняем ответы
    window.location.href = `results.html`; // Переходим на страницу результатов
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', finishQuiz); // Добавляем обработчик события
});
