// Quiz questions data
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

// Retrieve user progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Function to render quiz questions
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear existing questions

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");

    // Question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    question.choices.forEach((choice, j) => {
      // Create radio input for choices
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true); // Pre-check based on user progress
      }

      // Add event listener to update session storage on choice
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save progress to sessionStorage
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to calculate and display score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Display score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;

  // Save the score to localStorage
  localStorage.setItem("score", score);
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", calculateScore);

// Initialize the quiz
renderQuestions();
