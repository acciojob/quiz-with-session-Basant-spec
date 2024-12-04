// Questions data (provided)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve the user's progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Display questions and their choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear any existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Create question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    // Create choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the answer is already selected (from session storage)
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save the user's progress to session storage
function saveProgress() {
  const allRadioButtons = document.querySelectorAll('input[type="radio"]');
  allRadioButtons.forEach((radio) => {
    if (radio.checked) {
      const questionIndex = parseInt(radio.name.split('-')[1]);
      userAnswers[questionIndex] = radio.value;
    }
  });
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Calculate score and display it
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score on the page
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store score in local storage
  localStorage.setItem("score", score);
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", () => {
  saveProgress();
  calculateScore();
});

// Initial rendering of questions when the page loads
renderQuestions();

// If the page is reloaded, render the saved answers from sessionStorage
window.addEventListener("load", renderQuestions);
