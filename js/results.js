document.addEventListener('DOMContentLoaded', displayResults);

const correctAnswers = {
    "1": "option1",
    "2": "option3",
    "3": "option3",
    "4": "15",
    "5": "23",
    "6": "16",
    "7": ["1,5", "1.5"], // Поддержка для двух форматов
    "8": "23"
};

const questionsText = {
    "1": "Вопрос 1: Футбольная команда 'Квадратный круг' состоит из 11 игроков, включая вратаря. Какое утверждение является верным?",
    "2": "Вопрос 2: Свежесобранные ягоды черники содержат 99% воды. Через некоторое время эти же ягоды стали содержать 98% воды. Как изменилась масса ягод?",
    "3": "Вопрос 3: В треугольнике ABC известны длины двух сторон AB = π, BC = cos 30°, а длина стороны AC является целым числом. Найдите AC. Выберите верное утверждение.",
    "4": "Вопрос 4: Длина дорожки легкоатлетического стадиона равна 400 м. Из одной точки одновременно в разных направлениях с постоянной скоростью выбежали два бегуна. Один бегун имеет скорость 5 км/ч, второй – 7 км/ч. Сколько раз бегуны встретятся за время получасовой тренировки? (Старт за встречу не считаем.)",
    "5": "Вопрос 5: Решите уравнение: $$\\frac{|x-1|}{x-1} + \\frac{|x|}{x} + \\frac{|x+1|}{x+1} + (x-1)^2 + x^2 + (x+1)^2 = a$$ При всех значениях параметра \(a\). В ответ запишите сумму целых значений \(a\), при которых уравнение имеет ровно одно решение.",
    "6": "Вопрос 6: Решите в целых числах уравнение $$6x^2-3xy+7y-23x+26=0$$. В ответ запишите сумму произведений всех найденных значений $$(x;y)$$. (Например, найденные решения – это две пары (1; 1) и (2; 3), тогда в ответ следует записать число 7, потому что \(1 \\cdot 1 + 2 \\cdot 3 = 7\).)",
    "7": "Вопрос 7: В равнобедренном треугольнике ABC AB = BC = 4, AC = 2, BH− высота. Вписанная в треугольник ABC окружность второй раз пересекает высоту BH в точке K. Найдите BK : KH.",
    "8": "Вопрос 8: Точки L, E, F, T – последовательные вершины параллелограмма. На отрезке LT отмечена точка N такая, что LN : NT = 3 : 2. На отрезке LF отмечена точка O такая, что LO : OF = 2 : 3. Прямая NO пересекает отрезок EF в точке G. Найдите площадь четырехугольника LEGO, если площадь параллелограмма LEF T равна 100."
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
    const subject = 'math'; // Используйте правильный ключ для доступа к данным
    const answers = JSON.parse(localStorage.getItem(`quizAnswers_${subject}`));

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

        // Добавить текст вопроса
        const questionText = questionsText[question] || `Вопрос ${question}`;

        if (isCorrect) {
            correctCount++;
        }

        resultsHtml += `<p>${questionText}<br>Ваш ответ: "${answerText}", Правильный ответ: "${correctAnswerText}"</p>`;
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 8 вопросов</h3>` + resultsHtml;
    document.getElementById('results').innerHTML = resultsHtml;
}
