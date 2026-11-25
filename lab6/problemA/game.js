// ===== Game state (variables shared by all functions) =====
let gameStarted = false;   // becomes true after a valid name is entered
let playerName = "";
let wins = 0;
let losses = 0;
let draws = 0;
let round = 0;             // number of rounds played
let results = [];          // stores "Win", "Lose" or "Draw" for every round

// ===== startGame(): validate name, welcome the player, show start time =====
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    // Empty name -> alert and stop
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    playerName = name;
    gameStarted = true;
    document.getElementById("welcome").innerHTML = "Welcome, " + playerName + "!";
    document.getElementById("startTime").innerHTML = "Game started: " + Date();
}

// ===== getComputerChoice(): random choice from an array =====
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3);   // 0, 1 or 2
    return choices[index];
}

// ===== playRound(): play one round =====
function playRound(playerChoice) {
    // Game must be started first
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let result;

    // Decide the winner with if...else
    if (playerChoice === computerChoice) {
        result = "Draw";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        result = "Win";
    } else {
        result = "Lose";
    }

    // Change the src of both images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Show the result message and change its colour
    let resultEl = document.getElementById("result");
    if (result === "Win") {
        resultEl.innerHTML = "You win!";
        resultEl.style.color = "green";
        wins++;
    } else if (result === "Lose") {
        resultEl.innerHTML = "You lose!";
        resultEl.style.color = "red";
        losses++;
    } else {
        resultEl.innerHTML = "It's a draw!";
        resultEl.style.color = "grey";
        draws++;
    }

    // Update the scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store the result and add a new row to the history table
    results.push(result);
    round++;
    document.getElementById("history").innerHTML +=
        "<tr><td>" + round + "</td><td>" + playerChoice + "</td><td>" +
        computerChoice + "</td><td>" + result + "</td></tr>";
}

// ===== showSummary(): count wins with a for loop, show percentage =====
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let percentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + results.length + " rounds and won " + percentage + "%";
}

// ===== resetGame(): set everything back to the start =====
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Clear history rows (keep only the header row)
    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

    // Put both images back to the default picture
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}
