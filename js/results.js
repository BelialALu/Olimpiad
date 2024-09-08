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

const answerTexts = {
    "1": {
        "option1": "1) Хотя бы два игрока команды родились в один день недели.",
        "option2": "2) Хотя бы два игрока команды родились в понедельник.",
        "option3": "3) Вратарь и один из полевых игроков родились в один день недели."
    },
    "2": {
        "option1": "1) Уменьшилась на 1%.",
        "option2": "2) Уменьшилась в 98/99 раз.",
        "option3": "3) Уменьшилась в 2 раза."
    },
    "3": {
        "option1": "1) Единственное возможное значение длины стороны AC равно 3.",
        "option2": "2) Единственное возможное значение длины стороны AC равно 4.",
        "option3": "3) Длина стороны AC может быть равна 3 или 4."
    },
    "4": {
        "correct": "15"
    },
    "5": {
        "correct": "23"
    },
    "6": {
        "correct": "16"
    },
    "7": {
        "option1": "1,5",
        "option2": "1.5"
    },
    "8": {
        "correct": "23"
    }
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
        const isCorrect = Array.isArray(correctAnswer) ? correctAnswer.includes(answer) : correctAnswer === answer;

        // Получить текст выбранного ответа
        const answerText = answerTexts[question] && answerTexts[question][answer] ? answerTexts[question][answer] : answer;
        // Получить текст правильного ответа
        const correctAnswerText = Array.isArray(correctAnswer)
            ? correctAnswer.map(ans => answerTexts[question] && answerTexts[question][ans] ? answerTexts[question][ans] : ans).join(' или ')
            : answerTexts[question] && answerTexts[question][correctAnswer] ? answerTexts[question][correctAnswer] : correctAnswer;

        if (isCorrect) {
            correctCount++;
        }

        resultsHtml += `<p>Вопрос ${question}: Ваш ответ: "${answerText}", Правильный ответ: "${correctAnswerText}"</p>`;
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 8 вопросов</h3>` + resultsHtml;
    document.getElementById('results').innerHTML = resultsHtml;
}
