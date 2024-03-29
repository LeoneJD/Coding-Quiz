// create an array of of objects for questions

const questions = [
    {
      question: "Question 1",
      choices: ["Answer 1", "Answer 2", "Answer 3"],
      answer: "Answer 1"
    },
   
    {
        question: "Question 2",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },
     
      {
        question: "Question 3",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 4",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 5",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 6",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 7",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 8",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 9",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },

      {
        question: "Question 10",
        choices: ["Answer 1", "Answer 2", "Answer 3"],
        answer: "Answer 1"
      },
  ];
  
  // Add an event listener to start quiz 
function startQuiz() {
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    showQuestion();
    startTimer();
  }

// Implement timer
let time = 60;
let timerInterval;

function startTimer() {
  const timerEl = document.getElementById('time');
  timerEl.textContent = time; // Initialize timer display

  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      timerEl.textContent = time;
    } else {
      endQuiz();
    }
  }, 1000);
}

// Show questions 
let currentQuestionIndex = 0;

function showQuestion() {
  const questionObj = questions[currentQuestionIndex];
  document.getElementById('question-title').textContent = questionObj.question;
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = ''; // Clear previous choices

  questionObj.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', checkAnswer);
    choicesEl.appendChild(button);
  });
}

function checkAnswer(event) {
  if (event.target.textContent !== questions[currentQuestionIndex].answer) {
    time -= 10; // Subtract time for incorrect answer
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End quiz 
function endQuiz() {
    clearInterval(timerInterval); // Correctly clear the interval
    document.getElementById('questions').classList.add('hide');
    document.getElementById('end-screen').classList.remove('hide');
    document.getElementById('final-score').textContent = time;
  }

// Save scores and redirect 
document.getElementById('submit').addEventListener('click', function() {
    const initials = document.getElementById('initials').value;

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ initials, score: time });
    localStorage.setItem('scores', JSON.stringify(scores));
  
    window.location.href = 'highscores.html';
  });
  
// High scores 
function displayScores() {
    const highscoresEl = document.getElementById('highscores');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
  
    // Sort scores from high to low before displaying
    scores.sort((a, b) => b.score - a.score);
  
    scores.forEach(score => {
      const li = document.createElement('li');
      li.textContent = `${score.initials}: ${score.score}`;
      highscoresEl.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayScores);

  document.getElementById('start').addEventListener('click', startQuiz);