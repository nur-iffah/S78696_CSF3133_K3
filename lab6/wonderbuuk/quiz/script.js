// ===== Questions Array: question, options and the index of the correct answer =====
const questions = [
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<script>", "<js>", "<link>", "<style>"],
        answer: 0
    },
    {
        question: "Which CSS property changes the colour of text?",
        options: ["font-color", "color", "text-style", "fgcolor"],
        answer: 1
    },
    {
        question: "Which method finds an HTML element by its id?",
        options: ["document.getElement()", "document.findId()", "document.getElementById()", "document.query()"],
        answer: 2
    },
    {
        question: "What does Math.floor(Math.random() * 10) return?",
        options: ["A whole number from 0 to 9", "A whole number from 1 to 10", "A decimal from 0 to 10", "Always 10"],
        answer: 0
    },
    {
        question: "Which operator checks that two values are equal AND of the same type?",
        options: ["=", "==", "===", "=>"],
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
        answer: 1
    },
    {
        question: "Which HTML5 element is used for the footer of a page?",
        options: ["<bottom>", "<end>", "<footer>", "<foot>"],
        answer: 2
    },
    {
        question: "Which event runs a function when a button is clicked?",
        options: ["onhover", "onsubmit", "onload", "onclick"],
        answer: 3
    }
];

// ===== Quiz state =====
const TIME_PER_QUESTION = 15;   // seconds for each question
let shuffled = [];              // questions in random order
let currentIndex = 0;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerId = null;
let answered = false;           // true after the current question is checked

// ===== shuffleQuestions(): randomly reorder the questions (Fisher-Yates) =====
function shuffleQuestions() {
    shuffled = questions.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
}

// ===== startQuiz(): shuffle, show the first question, start the timer =====
function startQuiz() {
    shuffleQuestions();
    currentIndex = 0;
    score = 0;
    document.getElementById("startSection").classList.add("hidden");
    document.getElementById("quizSection").classList.remove("hidden");
    document.getElementById("finalScore").innerHTML = "Finish the quiz to see your score.";
    displayQuestion();
    startTimer();
}

// ===== startTimer(): countdown for each question =====
function startTimer() {
    clearInterval(timerId);
    timeLeft = TIME_PER_QUESTION;
    updateTimerText();
    timerId = setInterval(function () {
        timeLeft--;
        updateTimerText();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(true);   // time is up
        }
    }, 1000);
}

function updateTimerText() {
    let timerEl = document.getElementById("timer");
    timerEl.innerHTML = "Time left: " + timeLeft + "s";
    // Turn red when 5 seconds or less remain
    if (timeLeft <= 5) {
        timerEl.classList.add("low");
    } else {
        timerEl.classList.remove("low");
    }
}

// ===== displayQuestion(): show the current question and its options =====
function displayQuestion() {
    answered = false;
    let q = shuffled[currentIndex];

    document.getElementById("questionCount").innerHTML =
        "Question " + (currentIndex + 1) + " of " + shuffled.length + " | Score: " + score;
    document.getElementById("questionText").textContent = q.question;

    // Build the options as radio buttons (textContent keeps tags like <script> as plain text)
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    for (let i = 0; i < q.options.length; i++) {
        let label = document.createElement("label");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        radio.value = i;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + q.options[i]));
        optionsDiv.appendChild(label);
    }

    // Clear feedback and reset the button
    let feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
    feedback.className = "";
    document.getElementById("actionBtn").innerHTML = "Submit Answer";
}

// ===== checkAnswer(): is the selected answer correct? Update score and feedback =====
function checkAnswer(timedOut) {
    if (answered) {
        return;
    }
    let q = shuffled[currentIndex];
    let selected = document.querySelector('input[name="choice"]:checked');

    // No answer chosen and time not up -> ask the user to choose
    if (!selected && !timedOut) {
        alert("Please select an answer.");
        return;
    }

    answered = true;
    clearInterval(timerId);

    let feedback = document.getElementById("feedback");
    let labels = document.querySelectorAll("#options label");
    let radios = document.querySelectorAll('input[name="choice"]');

    // Lock the options so the answer cannot be changed
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }
    // Highlight the correct answer
    labels[q.answer].classList.add("correct");

    if (selected && parseInt(selected.value) === q.answer) {
        score++;
        feedback.innerHTML = "Correct! Well done.";
        feedback.className = "correct";
    } else {
        if (selected) {
            labels[parseInt(selected.value)].classList.add("incorrect");
        }
        feedback.innerHTML = (timedOut && !selected ? "Time is up! " : "Incorrect. ") +
            "The correct answer is: " + q.options[q.answer];
        feedback.className = "incorrect";
    }

    // Update the score shown above the question
    document.getElementById("questionCount").innerHTML =
        "Question " + (currentIndex + 1) + " of " + shuffled.length + " | Score: " + score;

    // Change the button so the user can move on
    document.getElementById("actionBtn").innerHTML =
        (currentIndex === shuffled.length - 1) ? "Finish Quiz" : "Next Question";
}

// ===== handleAction(): the one button either submits or moves on =====
function handleAction() {
    if (!answered) {
        checkAnswer(false);
    } else {
        nextQuestion();
    }
}

// ===== nextQuestion(): go to the next question, reset the timer and update the score =====
function nextQuestion() {
    currentIndex++;
    if (currentIndex >= shuffled.length) {
        finishQuiz();
        return;
    }
    displayQuestion();
    startTimer();
}

// ===== finishQuiz(): show the final score in the footer =====
function finishQuiz() {
    clearInterval(timerId);
    let percent = Math.round((score / shuffled.length) * 100);
    document.getElementById("finalScore").innerHTML =
        "Quiz finished! Your score: " + score + " / " + shuffled.length + " (" + percent + "%)";

    // Replace the quiz area with a restart option
    document.getElementById("quizSection").classList.add("hidden");
    document.getElementById("startSection").classList.remove("hidden");
    document.querySelector("#startSection p").innerHTML = "Want to try again with the questions in a new order?";
    document.querySelector("#startSection button").innerHTML = "Restart Quiz";
}
