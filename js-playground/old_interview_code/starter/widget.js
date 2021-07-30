const boardWidth = 16;
const boardHeight = 10;
const board = document.getElementById('board');

const snake = {
  history: [],
  health: 5,
  x: boardWidth / 2,
  y: boardHeight / 2,
  direction: { x: 1, y: 0 },
};

const cherryCoords = {
  x: randomInt(0, 16),
  y: randomInt(0, 10)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function renderBoard() {
  let newBoard = '';
  
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      let checkIfExist = snake.history.some((coords) => {
        if(coords.x === x && coords.y === y) {
          return true;
        }
      })
      if (snake.x === x && snake.y === y || checkIfExist) {
        newBoard += "*"
      } else {
        if( x === cherryCoords.x && y === cherryCoords.y) {
          newBoard += "+"
        } else {
          newBoard += ' ';
        }
      }
      
    }
    newBoard += '\n';
  }
  board.textContent = newBoard;
}

function buildSnake(snake) {
  for (let i = 1; i <=5 ; i++) {
    snake.history.unshift({
      x: snake.x - i,
      y: snake.y
    })
  }
}

function resetGame() {
  snake.history = []
  snake.health =  5
  snake.x = boardWidth / 2
  snake.y = boardHeight / 2
  snake.direction = { x: 1, y: 0 }
  cherryCoords.x = randomInt(0, 16)
  cherryCoords.y = randomInt(0, 10)
  renderBoard()
}

buildSnake(snake)

function gameLoop() {
  snake.x += snake.direction.x;
  snake.y += snake.direction.y;
  if (snake.x === boardWidth && snake.direction.x > 0) {
    snake.x = 0;
  }
  else if (snake.x < 0 && snake.direction.x < 0) {
    snake.x = boardWidth - 1
  }

  if (snake.y === boardHeight && snake.direction.y > 0) {
    snake.y = 0;
  }
  else if (snake.y < 0 && snake.direction.y < 0) {
    snake.y = boardHeight - 1
  }

  snake.history.forEach((coords) => {
    if (snake.x === coords.x && snake.y === coords.y) {
      resetGame()
    }
  })

  snake.history.unshift({
    x:snake.x, y: snake.y
  })

  if(snake.history.length > snake.health) {
    snake.history.pop()
  }
  if (snake.y === cherryCoords.y && snake.x === cherryCoords.x) {
    snake.health++;
    cherryCoords.x = randomInt(0, boardWidth)
    cherryCoords.y = randomInt(0, boardHeight)
  }
  renderBoard();
}

renderBoard();
setInterval(gameLoop, 200);

const keyToDirection = {
  'ArrowUp': { x: 0, y: -1 },
  'ArrowRight': { x: 1, y: 0 },
  'ArrowDown': { x: 0, y: 1 },
  'ArrowLeft': { x: -1, y: 0 },
};

document.addEventListener('keydown', e => {
  if (keyToDirection[e.key]) {
    snake.direction = keyToDirection[e.key];
  }
});
