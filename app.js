const quizData = {
    maths: [
        { question: "Combien font 5 + 7 ?", answers: ["10", "12", "15"], correct: 1 },
        { question: "Quelle est la formule de l'aire d'un cercle ?", answers: ["πr²", "2πr", "πd"], correct: 0 }
    ],
    francais: [
        { question: "Quelle est la nature de 'le' ?", answers: ["Une préposition", "Un pronom", "Un déterminant"], correct: 2 },
        { question: "Quelle est la nature du mot 'à' ?", answers: ["Adjectif", "Adverbe", "Préposition"], correct: 2 },
        { question: "Quelle est la nature du mot 'mais' ?", answers: ["Conjonction", "Adverbe", "Préposition"], correct: 0 },
        { question: "Quelle est la nature du mot 'camion' ?", answers: ["Adjectif", "Nom", "Préposition"], correct: 1 },
        { question: "Quelle est la nature du mot 'beau' ?", answers: ["Adjectif", "Adverbe", "Préposition"], correct: 0 },
        { question: "Quelle est la nature du mot 'aujourd'hui' ?", answers: ["Adjectif", "Adverbe", "Préposition"], correct: 1 },
        { question: "Quelle est la nature du mot 'manger' ?", answers: ["Pronom", "Adverbe", "Verbe"], correct: 2 },
        { question: "Quelle est la nature du mot 'je' ?", answers: ["Pronom", "Préposition", "Préposition"], correct: 0 },
        { question: "A quel temps est conjugué le verbe dans 'je mange' ?", answers: ["Présent", "Imparfait", "Futur"], correct: 0 },
        { question: "'Manger' à la 2e personne du singulier donne :", answers: ["Mange", "Manges", "Mangez"], correct: 1 },
        { question: "'Manger' à la 1ere personne du pluriel donne :", answers: ["Mangent", "Mangez", "Mangeons"], correct: 2 },
        { question: "Ce garçon ... plus grand que toi.", answers: ["es", "et", "est"], correct: 2 },
        { question: "Tu ... une belle maison.", answers: ["as", "a", "à"], correct: 0 },
        { question: "Ils ... impressionnés par ton exposé.", answers: ["sont", "son", "sons"], correct: 0 },
        { question: "Qu'est-ce qu'un synonyme ?", answers: ["un mot contraire", "un mot qui a le même son", "un mot qui veut dire la même chose"], correct: 2 },
        { question: "'Aller' est une verbe du :", answers: ["1er groupe", "2e groupe", "3e groupe"], correct: 2 },
        { question: "'Vomir' est une verbe du :", answers: ["1er groupe", "2e groupe", "3e groupe"], correct: 1 },
        { question: "'Venir' est une verbe du :", answers: ["1er groupe", "2e groupe", "3e groupe"], correct: 2 },
        { question: "Qu'est-ce qu'un antonyme ?", answers: ["un mot contraire", "un mot qui a le même son", "un mot qui veut dire la même chose"], correct: 0 },
    ],
    histoire: [
        { question: "En quelle année est tombé le mur de Berlin ?", answers: ["1989", "1991", "1975"], correct: 0 },
        { question: "Qui était le premier président de la République française ?", answers: ["Louis-Napoléon Bonaparte", "Charles de Gaulle", "François Mitterrand"], correct: 0 }
    ],
    geographie: [
        { question: "Quel est le plus grand pays du monde ?", answers: ["Canada", "Russie", "Chine"], correct: 1 },
        { question: "Quelle est la capitale de l'Allemagne ?", answers: ["Berlin", "Munich", "Hambourg"], correct: 0 }
    ],
    sciences: [
        { question: "Quelle est la planète la plus proche du soleil ?", answers: ["Venus", "Mercure", "Mars"], correct: 1 },
        { question: "Quelle est la formule chimique de l'eau ?", answers: ["CO2", "O2", "H2O"], correct: 2 }
    ]
};

const subjectImages = {
    maths: "https://wallpaperaccess.com/full/970422.jpg",
    francais: "https://www.languagemagazine.com/wp-content/uploads/2019/07/french2-1024x724.jpg",
    histoire: "https://memoire-histoire.fr/wp-content/uploads/2017/03/histoire.jpg",
    geographie: "https://data.topquizz.com/distant/category/original/17.jpg",
    sciences: "https://media.istockphoto.com/photos/molecules-on-scientific-background-picture-id484278596?k=6&m=484278596&s=612x612&w=0&h=7bbpn3A_e5VJyhRxCQZwTtED3QvjQDDM59l-kJNuqnk=",
    all: "https://svtclasseinversee.blogs.laclasse.com/wp-content/uploads/sites/2278/2021/05/DNB-750x515.jpg"
};

let currentSubject = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
let questionCount = 20; // Valeur par défaut

function showQuestionCountSelection() {
    document.getElementById('subject-selection').classList.add('hidden');
    document.getElementById('question-count-selection').classList.remove('hidden');
}

function selectNumberOfQuestions(count) {
    questionCount = count;
    startQuiz('all');
}

function startQuiz(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    score = 0;

    if (subject === 'all') {
        const allQuestions = [...quizData.maths, ...quizData.francais, ...quizData.histoire, ...quizData.geographie, ...quizData.sciences];
        currentQuestions = shuffle(allQuestions).slice(0, questionCount);
    } else {
        currentQuestions = shuffle(quizData[subject]); // Mélange des questions pour les matières individuelles
    }

    document.getElementById('subject-title').textContent = subject === 'all' ? "Toutes les matières" : subject.charAt(0).toUpperCase() + subject.slice(1);

    // Afficher l'image de la matière
    const imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = `<img src="${subjectImages[subject]}" alt="Image pour ${subject}" />`;

    document.getElementById('question-count-selection').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');

    loadQuestion();
}

function loadQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById('question-container').textContent = questionData.question;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedAnswer) {
    const questionData = currentQuestions[currentQuestionIndex];

    const buttons = document.querySelectorAll('#answer-buttons button');
    buttons.forEach((button, index) => {
        if (index === questionData.correct) {
            button.classList.add('correct');
        } else if (index === selectedAnswer) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedAnswer === questionData.correct) {
        score++;
    }

    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
        document.getElementById('next-btn').classList.add('hidden');
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    const resultText = `Votre score est de ${score}/${currentQuestions.length}`;
    document.getElementById('result-score').textContent = resultText;

    // Enregistrer l'historique
    history.push({ subject: currentSubject, score: score, total: currentQuestions.length });
    localStorage.setItem('quizHistory', JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Jeu ${index + 1}: ${entry.subject === 'all' ? "Toutes les matières" : entry.subject} - Score: ${entry.score}/${entry.total}`;
        historyList.appendChild(li);
    });

    document.getElementById('history-section').classList.remove('hidden');
}

function restartQuiz() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
}

function goToMenu() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('history-section').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
}

// Fonction pour mélanger les questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
