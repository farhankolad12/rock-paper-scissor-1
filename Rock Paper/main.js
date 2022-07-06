const paper = document.querySelector(".paper");
const rock = document.querySelector(".rock");
const scissors = document.querySelector(".scissors");
const rulesBtn = document.getElementById("btn");
const modalContainer = document.querySelector(".modal");
const mainContainer = document.querySelector("main");
const scoreContainer = document.querySelector(".score-container");
const scoreText = document.getElementById("scores");
let score = 0;

const computerChoice = ["paper", "rock", "scissors"];

const paperClick = () => {
  const randomChoice = compChoice();
  let output = "";
  let res = "";
  if (computerChoice[randomChoice] == "paper") {
    res = "draw";
    output += checkWinner("paper", "paper", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
  } else if (computerChoice[randomChoice] == "rock") {
    res = "You Win";
    output += checkWinner("paper", "rock", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdate();
  } else if (computerChoice[randomChoice] == "scissors") {
    res = "You Lose";
    output += checkWinner("paper", "scissors", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdateLose();
  }
};

const rockClick = () => {
  const randomChoice = compChoice();
  let output = "";
  let res = "";
  if (computerChoice[randomChoice] == "paper") {
    res = "You Lose";
    output += checkWinner("rock", "paper", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdateLose();
  } else if (computerChoice[randomChoice] == "rock") {
    res = "Draw";
    output += checkWinner("rock", "rock", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
  } else if (computerChoice[randomChoice] == "scissors") {
    res = "You Win";
    output += checkWinner("rock", "scissors", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdate();
  }
};

const scissorsClick = () => {
  const randomChoice = compChoice();
  let output = "";
  let res = "";
  if (computerChoice[randomChoice] == "paper") {
    res = "You Win";
    output += checkWinner("scissors", "paper", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdate();
  } else if (computerChoice[randomChoice] == "rock") {
    res = "You Lose";
    output += checkWinner("scissors", "rock", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
    scoreText.innerHTML = scoreUpdateLose();
  } else if (computerChoice[randomChoice] == "scissors") {
    res = "Draw";
    output += checkWinner("scissors", "scissors", res);
    mainContainer.innerHTML = output;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", playAgain);
  }
};

const checkWinner = (youpicked, userpicked, res) => {
  let output = `
  <div class="you-picked">
        <div class="${
          youpicked == "paper"
            ? "paper-picked"
            : youpicked == "rock"
            ? "house-picked-red"
            : "house-picked-yellow"
        }
            ${res.match("Win") ? "win" : ""}">
            <h1>you picked</h1>
            <img src="/images/icon-${youpicked}.svg" alt="${youpicked} Img">
        </div>
        <div class="lose-win">
            <h1>${res}</h1>
            <button class="play-again">play again</button>
        </div>
        <div class="house-picked${
          userpicked == "rock"
            ? "-red"
            : userpicked == "scissors"
            ? "-yellow"
            : ""
        } ${res.match("Lose") ? "win" : ""}">
            <h1>house picked</h1>
            <img src="/images/icon-${userpicked}.svg" alt="${userpicked} Img">
        </div>
    </div>
  `;
  return output;
};

const scoreUpdate = () => {
  if (localStorage.getItem("score")) {
    score = 1 + parseInt(localStorage.getItem("score"));
    localStorage.setItem("score", score);
    return score;
  } else {
    score = score + 1;
    localStorage.setItem("score", score);
    return score;
  }
};

const scoreUpdateLose = () => {
  if (score == 0) {
    return score;
  } else if (localStorage.getItem("score")) {
    score = parseInt(localStorage.getItem("score")) - 1;
    localStorage.setItem("score", score);
    return score;
  } else if (!localStorage.getItem("score")) {
    score = score - 1;
    localStorage.setItem("score", score);
    return score;
  }
};

const playAgain = () => {
  let output = `<div class="triangle">
        <div class="paper">
               <img src="/images/icon-paper.svg" alt="Paper Img">
        </div>
        <div class="scissors">
               <img src="/images/icon-scissors.svg" alt="Scissors Img">
        </div>
        <div class="rock">
              <img src="/images/icon-rock.svg" alt="Rock Img">
        </div>
        </div>`;
  mainContainer.innerHTML = output;
  const paper = document.querySelector(".paper");
  const rock = document.querySelector(".rock");
  const scissors = document.querySelector(".scissors");
  userChoice(paper, rock, scissors);
};

const userChoice = (paper, rock, scissors) => {
  paper.addEventListener("click", paperClick);
  rock.addEventListener("click", rockClick);
  scissors.addEventListener("click", scissorsClick);
};

const loadScore = () => {
  if (!localStorage.getItem("score")) {
    return;
  } else {
    scoreText.innerHTML = localStorage.getItem("score");
  }
};

const compChoice = () => {
  return Math.floor(Math.random() * 3);
};

const openRules = () => {
  modalContainer.style.display = "block";
  mainContainer.style.opacity = "0.5";
  scoreContainer.style.opacity = "0.5";
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    mainContainer.style.opacity = "1";
    scoreContainer.style.opacity = "1";
    modalContainer.style.display = "none";
  });
};

userChoice(paper, rock, scissors);

document.addEventListener("DOMContentLoaded", loadScore);
rulesBtn.addEventListener("click", openRules);
