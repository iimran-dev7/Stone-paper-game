// Page Navigation
const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', () => {
    const landingPage = document.getElementById("landing-page");
    landingPage.classList.add("fade-out");
    setTimeout(() => {
        landingPage.style.display = "none";
        document.getElementById("game-page").style.display = "flex";
    }, 500);
});

// Game Logic
let userScore = 0, compScore = 0, round = 0;
const maxRounds = 3;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const userScoreSpan = document.querySelector('#user-score');
const compScoreSpan = document.querySelector('#comp-score');

const genCompChoice = () => ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScoreSpan.textContent = userScore;
        msg.innerHTML = `<span>You Win!</span> ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScoreSpan.textContent = compScore;
        msg.innerHTML = `<span>Computer Wins!</span> ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    round++;
    checkGameEnd();
};

const userLoses = (userChoice, compChoice) => 
    (userChoice === "rock" && compChoice === "paper") || 
    (userChoice === "scissors" && compChoice === "rock") || 
    (userChoice === "paper" && compChoice === "scissors");

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        msg.innerText = "It's a Draw! Play again.";
        msg.style.backgroundColor = "#081b31";
        return;
    }

    showWinner(!userLoses(userChoice, compChoice), userChoice, compChoice);
};

const checkGameEnd = () => {
    if (round === maxRounds) {
        if (userScore > compScore) {
            msg.innerText = "You win the game!";
            msg.style.backgroundColor = "green";
        } else if (userScore < compScore) {
            msg.innerText = "Computer wins the game!";
            msg.style.backgroundColor = "red";
        } else {
            msg.innerText = "It's a draw!";
            msg.style.backgroundColor = "#081b31";
        }

        setTimeout(resetGame, 3000);
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    round = 0;
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    msg.innerText = "Choose Rock, Paper, or Scissors!";
    msg.style.backgroundColor = "#081b31";
};

choices.forEach(choice => choice.addEventListener('click', () => playGame(choice.getAttribute("id"))));