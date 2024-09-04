// Скрипт для обработки результатов олимпиады
document.getElementById('quizForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    // Логика проверки ответов
    alert('Ваши результаты отправлены на проверку!');
    window.location.href = 'results.html';
});
