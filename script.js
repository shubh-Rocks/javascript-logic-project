const board = document.querySelector(".board");
const blockheight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

const blocks = [];
const snake = [{ x: 1, y: 5 }];

let direction = "right";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}${col}`] = block;
  }
}

setInterval(() => {
  let head = null;

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y +  1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();
  drawsnake();
}, 300);

function drawsnake() {
  snake.forEach((segment) => {
    blocks[`${segment.x}${segment.y}`].classList.add("fill");
  });
}
