var timeLeft = 120;
var score = 0;
var questionIndex = 0;

const questions = [
    {
        text: "Which one of these isn't a data type?",
        options: ['Boolean', 'Undefined', 'Commercial', 'String'],
        answer: 'Commercial'
    },
    {
        text: "Are these values equal? 33 '33' ",
        options: ['True', 'False',],
        answer: 'False'
    },
    {
        text: "To add a child to an element via JavaScript is to, ______ it",
        options: ['Append', 'Link', 'Alter', 'Pin'],
        answer: 'Append'
    },
    {
        text: "A JavaScript ________ is a block of code designed to perform a particular task. A JavaScript function is executed when something invokes it (calls it)",
        options: ['Equation', 'Function', 'Implant', 'Factory'],
        answer: 'Function'
    },
    {
        text: "The Console ___ method outputs a message to the web console. The message may be a single string (with optional substitution values), or it may be any one or more JavaScript objects.",
        options: ['Reach', 'Drop', 'Output', 'Log'],
        answer: 'Log'
    }
];

function displayQuestion() {
    const question = questions[questionIndex];
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("question").innerText = question.text;
}

function checkAnswer(selectedAnswer) {
    if (questions[questionIndex].answer === selectedAnswer) {
        score++;
    } else {
        timeLeft -= 10;
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("completion").style.display = "block";
    document.getElementById("score").innerText = score;
}

let timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
        endQuiz();
    }
}, 1000);



function saveScore() {
    const initials = document.getElementById("initials").value;
    if (initials) {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ initials, score });
        localStorage.setItem("scores", JSON.stringify(scores));
        alert("Score saved!");
    } else {
        alert("Please enter your initials.");
    }
}

function viewScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    scores.forEach(s => {
        const li = document.createElement("li");
        li.innerText = `${s.initials}: ${s.score}`;
        scoreList.appendChild(li);
    });
}

function clearScores() {
    localStorage.removeItem("scores");
    document.getElementById("scoreList").innerHTML = "";
    alert("Scores cleared!");
}

function startQuiz() {
    document.getElementById("startWindow").style.display = "none";

    displayQuestion();
}