document.addEventListener('DOMContentLoaded', displayResults);

const correctAnswers = {
    "1": "10",
    "2": "680",
  	"3": "Ethernet",
   	"4": "фиолетовый",
    "5": "A2B6",
    "6": "алгоритм",
    "7": "1111101",
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
        if (answer === correctAnswer) {
            correctCount++;
        }
        resultsHtml += `<p>Вопрос ${question}: Ваш ответ: "${answer}", Правильный ответ: "${correctAnswer}"</p>`;
    }

    resultsHtml = `<h3>Вы правильно ответили на ${correctCount} из 7 вопросов</h3>` + resultsHtml;
    document.getElementById('results').innerHTML = resultsHtml;
}

function openEmailModal() {
    document.getElementById('emailModal').style.display = 'block';
}

function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
}

function sendEmail() {
    const email = document.getElementById('emailInput').value;
    const incorrectAnswers = getIncorrectAnswers();  // Функция для получения неверных ответов
    if (email) {
        emailjs.send("service_nj9r4m3", "template_fio3l8v", {
            to_email: email,
            incorrect_answers: incorrectAnswers.join("\n")
        })
        .then(function (response) {
            alert('Письмо успешно отправлено!');
            closeEmailModal();
        }, function (error) {
            alert('Ошибка при отправке письма: ' + JSON.stringify(error));
        });
    } else {
        alert('Пожалуйста, введите корректный email.');
    }
}

function getIncorrectAnswers() {
    const answers = JSON.parse(localStorage.getItem('quizAnswers_informatics'));
    const incorrectAnswers = [];
    for (const [question, answer] of Object.entries(answers)) {
        if (correctAnswers[question] !== answer) {
            incorrectAnswers.push(`Вопрос ${question}: Ваш ответ "${answer}", Правильный ответ "${correctAnswers[question]}"`);
        }
    }
    return incorrectAnswers;
}
