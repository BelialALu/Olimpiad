document.addEventListener('DOMContentLoaded', displayResults);

const correctAnswers = {
    "1": "option1",
    "2": "option3",
    "3": "option3",
    "4": "15",
    "5": "23",
    "6": "16",
    "7": ["1,5", "1.5"], // Поддержка для двух форматов
    "8": "23",
};

function displayResults() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers_informatics'));
    if (!answers) {
        document.getElementById('results').innerHTML = '<p>Ответы не найдены. Пожалуйста, пройдите тест.</p>';
        return;
    }

    let correctCount = 0;
    let resultsHtml = '';

    for (const [question, answer] of Object.entries(answers)) {
        const correctAnswer = correctAnswers[question];
        // Проверка на соответствие правильному ответу
        const isCorrect = Array.isArray(correctAnswer) ? correctAnswer.includes(answer) : correctAnswer === answer;
        
        if (isCorrect) {
            correctCount++;
        }

        resultsHtml += `<p>Вопрос ${question}: Ваш ответ: "${answer}", Правильный ответ: "${Array.isArray(correctAnswer) ? correctAnswer.join(' или ') : correctAnswer}"</p>`;
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 8 вопросов</h3>` + resultsHtml;
    document.getElementById('results').innerHTML = resultsHtml;
}
