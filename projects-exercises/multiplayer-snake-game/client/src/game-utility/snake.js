const drawSnake = (gameBoard, snakeBody, snakeColor) => {
  if (!gameBoard) return;
  // only remove class='snake' child nodes

  for (const node of gameBoard.childNodes) {
    if (
      node.classList.value === 'snake' ||
      node.classList.value === 'snake head'
    ) {
      gameBoard.removeChild(node);
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    const segment = snakeBody[i];
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = segment[0];
    snakeElement.style.gridRowStart = segment[1];

    snakeElement.classList.add('snake');
    if (i === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.style.backgroundColor = snakeColor;
    }
    gameBoard.appendChild(snakeElement);
  }
};

const updateSnake = (snakeRef) => {
  moveSnake(snakeRef);
};

const sendSnakeData = () => {};

const getSnakeHead = (snakeData) => {
  let snake = [...snakeData];
  return [...snake[0]];
};

const getSnakeBody = (snakeData) => {
  let snake = [...snakeData];
  snake.shift();
  return snake;
};

const isSnakeDead = (snakeRef, boardSize) => {
  const snakeHead = getSnakeHead(snakeRef.current.body);
  const snakeBody = getSnakeBody(snakeRef.current.body);
  if (onSnake(snakeHead, snakeBody)) {
    return true;
  }

  return false;
};

const onSnake = (snakeHead, snakeBody) => {
  return snakeBody.some((segment, index) => {
    return snakeHead[0] === segment[0] && snakeHead[1] === segment[1];
  });
};

const moveSnake = (snakeRef) => {
  let oldSnakeBody = [...snakeRef.current.body];
  let newSnakeHead = getSnakeHead(oldSnakeBody);

  if (snakeRef.current.direction === 'left') {
    newSnakeHead[0] -= 1;
  }
  if (snakeRef.current.direction === 'right') {
    newSnakeHead[0] += 1;
  }
  if (snakeRef.current.direction === 'up') {
    newSnakeHead[1] -= 1;
  }
  if (snakeRef.current.direction === 'down') {
    newSnakeHead[1] += 1;
  }

  oldSnakeBody.pop();
  snakeRef.current.body = [newSnakeHead, ...oldSnakeBody];
};

function growSnake(snakeBody) {
  snakeBody.push([...snakeBody[snakeBody.length - 1]]);
}

export {
  drawSnake,
  updateSnake,
  sendSnakeData,
  getSnakeHead,
  growSnake,
  isSnakeDead,
};
