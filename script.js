const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', () => {
    const landingPage = document.getElementById("landing-page");
    landingPage.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
        landingPage.style.display = "none"; // Hide landing page after fade-out
        document.getElementById("game-page").style.display = "block"; // Show game page
    }, 500); // Duration of the fade-out effect
});

// Game variables
let userScore = 0;  
let compScore = 0;  
let round = 0;
const maxRounds = 3;

const choices = document.querySelectorAll('.choice');  
const msg = document.querySelector('#msg');            

const userScoreSpan = document.querySelector('#user-score');
const compScoreSpan = document.querySelector('#comp-score');

// Function to generate a random computer choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
};

// Function to handle a draw
const drawGame = () => {    
    msg.innerText = "It's a Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
};

// Function to determine and display the winner
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

    round++; // Increment round
    checkGameEnd(); // Check if game should end
};

// Function to check if user loses
const userLoses = (userChoice, compChoice) => {
    return (
        (userChoice === "rock" && compChoice === "paper") || 
        (userChoice === "scissors" && compChoice === "rock") ||
        (userChoice === "paper" && compChoice === "scissors")
    );
};

// Function to play the game
const playGame = (userChoice) => {
    console.log("The user chose: " + userChoice);
    const compChoice = genCompChoice();
    console.log("The computer chose: " + compChoice);

    if (userChoice === compChoice) {
        drawGame();
        return;
    }

    let userWin = !userLoses(userChoice, compChoice);
    showWinner(userWin, userChoice, compChoice);
};

// Function to check if game should end after max rounds
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

        // Reset game after displaying result
        setTimeout(resetGame, 3000);
    }
};

// Function to reset game
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    round = 0;
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    msg.innerText = "Choose Rock, Paper, or Scissors!";
    msg.style.backgroundColor = "#081b31";
};

// Adding event listeners for user choices
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});