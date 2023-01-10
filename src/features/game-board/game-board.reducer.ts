import { TOTAL_COLUMNS, TOTAL_ROWS, FOOD_EMOJIS } from "./game-board.constants";

const initialSnakeCoordinates: Snake = [
  { x: 4, y: 7 },
  { x: 4, y: 6 },
  { x: 4, y: 5 },
  { x: 4, y: 4 },
  { x: 4, y: 3 },
];

const getNewSnakeHead = (snake: Snake, direction: Direction) => {
  const head = { ...snake[0] };
  if (direction === "right") {
    head.x += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  }
  return head;
};

// TODO: add logic here to avoid wall collision
const increaseSnakeLength = (snake: Snake, direction: Direction) => {
  const snakeCopy = [...snake];
  const head = { ...snakeCopy[0] };
  const tail = { ...snakeCopy[snakeCopy.length - 1] };
  if (direction === "right") {
    head.x += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  }
  snakeCopy.unshift(head);
  return snakeCopy;
};

export const initialBoardState: BoardState = {
  snake: initialSnakeCoordinates,
  direction: "down",
  foodCoordinates: { x: null, y: null },
  hasFoodBeenCollected: false,
  currentScore: 0,
  elapsedTime: 0,
  isGameOver: false,
  foodEmoji: null,
};

export const gameReducer = (state: BoardState, action: GAME_ACTIONS) => {
  switch (action.type) {
    case "ARROW_DOWN_KEY_PRESSED":
    case "ARROW_RIGHT_KEY_PRESSED":
    case "ARROW_LEFT_KEY_PRESSED":
    case "ARROW_UP_KEY_PRESSED": {
      const currentDirection = state.direction;
      const newDirection = action.payload.direction;
      return { ...state, direction: newDirection };
    }

    case "SNAKE_INTERVAL_TICKED": {
      const head = getNewSnakeHead(state.snake, state.direction);
      const snake = [...state.snake];
      snake.unshift(head);
      snake.pop();
      return { ...state, snake };
    }

    case "GENERATE_FOOD": {
      const shouldGenerateFood =
        state.hasFoodBeenCollected ||
        (state.foodCoordinates.x === null && state.foodCoordinates.y === null);
      if (!shouldGenerateFood) return state;
      return {
        ...state,
        foodCoordinates: {
          x: Math.floor(Math.random() * TOTAL_COLUMNS),
          y: Math.floor(Math.random() * TOTAL_ROWS),
        },
        hasFoodBeenCollected: false,
        foodEmoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
      };
    }

    case "TIME_INTERVAL_TICKED": {
      return { ...state, elapsedTime: state.elapsedTime + 1 };
    }

    case "FOOD_COLLECTED": {
      return {
        ...state,
        snake: increaseSnakeLength(state.snake, state.direction),
        hasFoodBeenCollected: true,
        foodCoordinates: { x: null, y: null },
        foodEmoji: null,
        elapsedTime: 0,
        currentScore: state.currentScore + 50 - state.elapsedTime,
      };
    }

    case "RESET_BOARD": {
      return { ...initialBoardState };
    }

    case "GAME_OVER": {
      return { ...state, isGameOver: true };
    }

    default: {
      return state;
    }
  }
};