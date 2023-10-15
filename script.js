const QuestionElement = document.getElementById("Question");
const AnswerButtonsContainer = document.getElementById("answer-buttons");
const NextBtn = document.getElementById("next-btn");
let CurrentQuestionIndex = 0;
let Score = 0;

// Define an array of questions and answers
const QUESTIONS = [
  {
    question: "which the largest animales in the world",
    answers: [
      {
        text: "Shark",
        correct: "false",
      },
      {
        text: "Blue Whale",
        correct: "true",
      },
      {
        text: "Elephent",
        correct: "false",
      },
      {
        text: "Giraffe",
        correct: "false",
      },
    ],
  },
  {
    question: "which the smallest country in the world",
    answers: [
      {
        text: "Vatican City",
        correct: "true",
      },
      {
        text: "Bhutan",
        correct: "false",
      },
      {
        text: "Nebal",
        correct: "false",
      },
      {
        text: "Shri Lanka",
        correct: "false",
      },
    ],
  },
  {
    question: "which the largest desert in the world",
    answers: [
      {
        text: "Kalahari",
        correct: "false",
      },
      {
        text: "Gobi",
        correct: "false",
      },
      {
        text: "Sahara",
        correct: "false",
      },
      {
        text: "Antarctica",
        correct: "true",
      },
    ],
  },
  {
    question: "which the smallest continent in the world",
    answers: [
      { text: "Asia", correct: "false" },
      { text: "Astrulia", correct: "true" },
      { text: "Arctic", correct: "false" },
      { text: "Africa", correct: "false" },
    ],
  },
];

// Start the quiz and show the first question
function StartQuiz() {
  CurrentQuestionIndex = 0;
  Score = 0;
  NextBtn.innerHTML = "Next";
  ShowQuestion();
}

// Show the current question and answer options
function ShowQuestion() {
  ResetState();
  let CurrentQuestion = QUESTIONS[CurrentQuestionIndex];
  let QuestionNumber = CurrentQuestionIndex + 1;
  QuestionElement.innerHTML = `${QuestionNumber}.${CurrentQuestion.question}`;

  CurrentQuestion.answers.forEach((answer) => {
    // Create a new button for each answer option
    let Button = document.createElement("button");
    Button.classList.add("btn");
    Button.innerHTML = answer.text;
    AnswerButtonsContainer.appendChild(Button);

    // If answer option is correct set a data-correct attribute for the button to save value of correct: true or false
    if (answer.correct) {
      Button.dataset.correct = answer.correct;
    }

    // Add an event click to the button to handle selecting an answer
    Button.addEventListener("click", SelectAnswer);
  });
}

// Reset the state of the buttons and results
function ResetState() {
  NextBtn.style.display = "block";
  // Remove all buttons from the AnswerButtonsContainer
  while (AnswerButtonsContainer.firstChild) {
    AnswerButtonsContainer.removeChild(AnswerButtonsContainer.firstChild);
  }
}

// Handle selecting an answer and updating the score
function SelectAnswer(e) {
  let SelectBtn = e.target;
  let IsCorrect = SelectBtn.dataset.correct === "true";
  if (IsCorrect) {
    SelectBtn.classList.add("correct");
    Score++;
  } else {
    SelectBtn.classList.add("incorrect");
  }

  // Loop through all the answer buttons
  Array.from(AnswerButtonsContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });

  NextBtn.style.display = "block";
}

// Show the quiz score and a restart option
function ShowScore() {
  ResetState();
  QuestionElement.innerHTML = `your scored ${Score} out of ${QUESTIONS.length}!`;
  NextBtn.innerHTML = "Play Again";
  NextBtn.style.display = "block";
}

// Handle the next button and move to the next question or restart the quiz
function HandleNextButton() {
  CurrentQuestionIndex++;
  if (CurrentQuestionIndex < QUESTIONS.length) {
    ShowQuestion();
  } else {
    ShowScore();
  }
}

// Add an event listener to the next button to handle it
NextBtn.addEventListener("click", () => {
  if (CurrentQuestionIndex < QUESTIONS.length) {
    HandleNextButton();
  } else {
    StartQuiz();
  }
});
StartQuiz();
