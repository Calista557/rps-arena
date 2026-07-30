const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const nameForm = document.querySelector("#nameForm");
const playerNameInput = document.querySelector("#playerName");
// const playerDisplay = document.querySelector("#playerDisplay");
const scoreDisplay = document.querySelector("#scoreDisplay");

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const result = document.querySelector(".result p");
const resetBtn = document.querySelector("#reset");
const footer = document.querySelector("#footer");

let playerName = "";
let humanScore = 0;
let computerScore = 0;

nameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  playerName = playerNameInput.value.trim().toLowerCase();
  playerName = playerName[0].toUpperCase() + playerName.slice(1);

  if (!/^[a-z]+$/i.test(playerName)) {
    alert("Please enter a valid name using letters only.");
    return;
  }
  // playerDisplay.innerText = playerName;
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  footer.style.display = "block";

  updateScore();
});

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber === 0) {
    return "rock";
  } else if (randomNumber === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function playRound(playerChoice) {
  if (humanScore === 5 || computerScore === 5) {
    return;
  }
  let computerChoice = getComputerChoice();

  if (playerChoice === computerChoice) {
    result.innerText = `Great minds think alike! Both chose ${playerChoice.toUpperCase()}. Pick another move!`;

    return;
  }

  result.innerText = `${playerName}: ${playerChoice.toUpperCase()} | Computer: ${computerChoice.toUpperCase()}`;

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
  } else {
    computerScore++;
  }
  updateScore();

  if (humanScore === 5) {
    result.innerText = " CONGRATULATIONS, YOU WON THE GAME!";

    endGame();
  } else if (computerScore === 5) {
    result.innerText = " YOU LOST THIS MATCH, TRY AGAIN!";

    endGame();
  }

  // console.log("Player:", humanScore);
  // console.log("Computer:", computerScore);
}

function endGame() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
}

function resetResult() {
  humanScore = 0;
  computerScore = 0;

  updateScore();

  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;

  result.innerText = "Choose Your Move To Start The Game!";

  // console.log("Player:", humanScore);
  // console.log("Computer:", computerScore);
}

resetBtn.addEventListener("click", function () {
  resetResult();
});

rockBtn.addEventListener("click", function () {
  playRound("rock");
});

paperBtn.addEventListener("click", function () {
  playRound("paper");
  // let computerChoice = getComputerChoice();
  // result.innerText = `You Chose PAPER, Computer Chose ${computerChoice.toUpperCase()}`;
});

scissorsBtn.addEventListener("click", function () {
  playRound("scissors");
  // let computerChoice = getComputerChoice();
  // result.innerText = `You Chose SCISSORS, Computer Chose ${computerChoice.toUpperCase()}`;
});

function updateScore() {
  scoreDisplay.innerText = `${playerName}: ${humanScore} vs Computer: ${computerScore}`;
}
