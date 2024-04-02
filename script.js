let playerName;
let currentQuestion = 0;
let score = 0;
let difficulty;
let questions;

function startQuiz() {
    playerName = document.getElementById('playerName').value.trim();
    if (playerName !== '') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('difficulty').style.display = 'block';
    } else {
        alert('Por favor, digite seu nome.');
    }
}

function loadQuestions() {
    difficulty = document.getElementById('difficultySelect').value;
    fetchQuestions(difficulty);
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
}

function fetchQuestions(difficulty) {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data[difficulty];
            showQuestion();
        })
        .catch(error => console.error('Erro ao carregar perguntas:', error));
}

function showQuestion() {
    const current = questions[currentQuestion];
    document.getElementById('question').textContent = current.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    current.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-button';
        button.onclick = () => checkAnswer(option === current.answer);
        optionsDiv.appendChild(button);
    });
}


function checkAnswer(correct) {
    if (correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    const resultText = `Parabéns, ${playerName}! Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById('resultText').textContent = resultText;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}
