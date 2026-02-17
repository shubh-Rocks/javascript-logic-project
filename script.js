const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockheight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

const blocks = [];

let snake = [{ x: 1, y: 5 }];
let direction = "down";

let timerintervalId = null;
let intervalId = null;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;

let score = 0;
let time = `00-00`;


let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

// snake render logic
function drawsnake() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }

  // food consume logic code
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score += 10;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

// start button logic
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    drawsnake();
  }, 300);
  timerintervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);

    if (sec == 59) {
      min =+ 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${min}-${sec}`;
    timeElement.innerText = time;
  }, 1000);
});


restartButton.addEventListener("click", restartGame);

// restart game logic function
function restartGame() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  score = 0;
  time = `00-00`;

  scoreElement.innerText = score;
  highScoreElement.innerText = highScore;
  timeElement.innerText = time;

  blocks[`${food.x}-${food.y}`].classList.remove("food");

  modal.style.display = "none";

  snake = [{ x: 1, y: 9 }];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  intervalId = setInterval(() => {
    drawsnake();
  }, 300);
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  }
  console.log(event.key);
});
