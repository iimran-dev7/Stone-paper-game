const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', () => {
    const landingPage = document.getElementById("landing-page");
    landingPage.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
        landingPage.style.display = "none"; // Hide landing page after fade-out
        document.getElementById("game-page").style.display = "block"; // Show game page
    }, 500); // Duration of the fade-out effect
});

// Game page logic  
let userScore = 0;    // User's score
let compScore = 0;    // Computer's score  // Maximum rounds

const choices = document.querySelectorAll('.choice');   // Getting all choices
const msg = document.querySelector('#msg');            // Message display

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
        msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScoreSpan.textContent = compScore;
        msg.innerText = `Computer wins! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    } 
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

    let userWin = false;

    if ((userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")) {
    }

    showWinner(userWin, userChoice, compChoice, userLoses , gameRounds);
};


// Adding event listeners for user choices
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);

    });
});

// loosing paterns of the game 

const userLoses = () => {
    if ((userChoice === "rock" && compChoice === "paper") || 
        (userChoice === "scissors" && compChoice === "rock") ||
        (userChoice === "paper" && compChoice === "scissors")) {
        userWin = false;
        compChoice = true;
        
    }
};

const gameRounds = () => {
    let round = 0;
    let maxRounds = 3;
    if ( round === maxRounds) {
        if (userScore > compScore) {
            msg.innerText = "You win the game!";
            msg.style.backgroundColor = "green";
        } else if (userScore < compScore) {
            msg.innerText = "Computer wins the game!";
            msg.style.backgroundColor = "red";
        } else {
            if (userScore === compScore) {
                msg.innerText = "It's a draw!";
                msg.style.backgroundColor = "#081b31";
            }
        }
    }
};

