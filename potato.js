let score = 0;
let potato = document.getElementById("potato");
let scoreDisplay = document.getElementById("score");
let gameTime = 30;

// Create timer display
let timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
document.body.insertBefore(timerDisplay, potato);

// Create Game Over message
let gameOverMessage = document.createElement("h2");
gameOverMessage.id = "game-over";
gameOverMessage.style.display = "none";
document.body.appendChild(gameOverMessage);

// Create Restart button
let restartButton = document.createElement("button");
restartButton.textContent = "🔄 Play Again";
restartButton.style.display = "none";
restartButton.onclick = startGame;
document.body.appendChild(restartButton);

let moveInterval, countdown;

// Move potato to random position
function movePotato() {
  let potatoSize = 80;
  let x = Math.random() * (window.innerWidth - potatoSize);
  let y = Math.random() * (window.innerHeight - potatoSize - 50);
  potato.style.left = x + "px";
  potato.style.top = y + "px";
}

// Handle potato click/tap
["click", "touchstart"].forEach(evt => {
  potato.addEventListener(evt, () => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    movePotato();
  });
});

function startGame() {
  // Reset values
  score = 0;
  gameTime = 30;
  scoreDisplay.textContent = "Score: " + score;
  potato.style.display = "inline";
  timerDisplay.style.display = "block";
  gameOverMessage.style.display = "none";
  restartButton.style.display = "none";

  // Start moving potato
  movePotato();
  moveInterval = setInterval(movePotato, 1000);

  // Start countdown
  countdown = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${gameTime}s`;
    gameTime--;

    if (gameTime < 0) {
      clearInterval(moveInterval);
      clearInterval(countdown);
      potato.style.display = "none";
      timerDisplay.style.display = "none";
      gameOverMessage.textContent = `🎉 Game Over! Your final score: ${score}`;
      gameOverMessage.style.display = "block";
      restartButton.style.display = "inline";
    }
  }, 1000);
}

// Start first game
startGame();
