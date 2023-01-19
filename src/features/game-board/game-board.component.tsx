import * as React from "react";
import clsx from "clsx";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { useDrag } from "@use-gesture/react";

import { useInterval, useReducerWithSideEffects } from "src/common/hooks";

import { TOTAL_COLUMNS, TOTAL_ROWS } from "./game-board.constants";
import { createGameReducer, initialBoardState } from "./game-board.reducer";
import {
  detectSwipeDirection,
  dispatchArrowKeyEvent,
} from "./game-board.helpers";

import HeaderRow from "./components/header-row";

import * as theme from "src/styles/theme.css";
import * as styles from "./game-board.css";

const GameBoard = () => {
  const [highestScore, setHighestScore] = useLocalStorage<null | number>(
    "highestScore",
    null
  );
  const smallScreen = useMediaQuery("(max-height: 700px)");
  const totalRows = smallScreen ? TOTAL_ROWS - 5 : TOTAL_ROWS;

  const gameReducerSideEffects = (state: BoardState, action: GAME_ACTIONS) => {
    switch (action.type) {
      case "ARROW_DOWN_KEY_PRESSED":
      case "ARROW_RIGHT_KEY_PRESSED":
      case "ARROW_LEFT_KEY_PRESSED":
      case "ARROW_UP_KEY_PRESSED":
      case "SNAKE_INTERVAL_TICKED":
      case "GENERATE_FOOD": {
        const snakeHead = state.snake[0];
        const uniqueSnakeCoordinates = new Set(
          state.snake.map((snakePart) => `${snakePart.x}-${snakePart.y}`)
        ).size;
        if (uniqueSnakeCoordinates !== state.snake.length) {
          state.currentScore > (highestScore ?? 0) &&
            setHighestScore(state.currentScore);
          return {
            type: "GAME_OVER",
            payload: { reason: "self" },
          } as GAME_ACTIONS;
        }
        if (
          snakeHead.x < 0 ||
          snakeHead.x >= TOTAL_COLUMNS ||
          snakeHead.y < 0 ||
          snakeHead.y >= totalRows
        ) {
          state.currentScore > (highestScore ?? 0) &&
            setHighestScore(state.currentScore);
          return {
            type: "GAME_OVER",
            payload: { reason: "wall" },
          } as GAME_ACTIONS;
        }
        if (
          snakeHead.x === state.foodCoordinates.x &&
          snakeHead.y === state.foodCoordinates.y
        ) {
          return { type: "FOOD_COLLECTED" } as GAME_ACTIONS;
        }
      }
    }
  };
  const [
    {
      snake,
      direction,
      foodCoordinates,
      hasFoodBeenCollected,
      currentScore,
      elapsedTime,
      isGameOver,
      foodEmoji,
      hasGameBeenReset,
      gameOverReason,
    },
    dispatch,
  ] = useReducerWithSideEffects(
    createGameReducer(totalRows),
    gameReducerSideEffects,
    initialBoardState
  );

  const snakeIntervalDuration =
    currentScore < 50 ? 500 : Math.max(150, 500 / (currentScore / 50));
  const snakeInterval = useInterval(() => {
    dispatch({ type: "SNAKE_INTERVAL_TICKED" });
    // console.count("snakeInterval");
  }, snakeIntervalDuration);

  const foodInterval = useInterval(() => {
    dispatch({ type: "GENERATE_FOOD" });
  }, 3000);

  const timeInterval = useInterval(() => {
    dispatch({ type: "TIME_INTERVAL_TICKED" });
    if (elapsedTime === 50 && !hasFoodBeenCollected) {
      dispatch({ type: "GENERATE_FOOD" });
    }
  }, 1000);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      dispatchArrowKeyEvent(event.code, dispatch);
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [snake]);

  const bind = useDrag(
    ({ last, swipe: [swipeX, swipeY], offset: [offsetX, offsetY] }) => {
      if (last) {
        const swipeDirection = detectSwipeDirection({
          swipeX,
          swipeY,
          offsetX,
          offsetY,
          currentDirection: direction,
        });
        swipeDirection && dispatchArrowKeyEvent(swipeDirection, dispatch);
      }
    },
    { swipe: { duration: 1000, distance: [0, 0], velocity: [0, 0] } }
  );

  React.useEffect(() => {
    const clearIntervals = () => {
      snakeInterval.clear();
      foodInterval.clear();
      timeInterval.clear();
    };
    if (isGameOver) {
      clearIntervals();
    }
  }, [isGameOver]);

  const onPlayAgainClick = React.useCallback(() => {
    dispatch({ type: "RESET_BOARD" });
    snakeInterval.set();
    foodInterval.set();
    timeInterval.set();
  }, []);

  const startGame = React.useCallback(() => {
    snakeInterval.set();
    foodInterval.set();
    timeInterval.set();
  }, []);

  const BOARD: number[][] = Array(totalRows).fill(Array(TOTAL_COLUMNS).fill(0));

  return (
    <div className={styles.gameContainer[smallScreen ? "small" : "large"]}>
      <HeaderRow currentScore={currentScore} />
      {isGameOver ? (
        <button onClick={onPlayAgainClick} className={theme.button.primary}>
          {`Oops, ${
            gameOverReason === "wall"
              ? "you hit the wall."
              : "you ate yourself."
          } Play Again?`}
        </button>
      ) : !hasGameBeenReset && currentScore === 0 && elapsedTime === 0 ? (
        <button onClick={startGame} className={theme.button.primary}>
          Start Game
        </button>
      ) : (
        <button className={theme.button.primary}>
          {elapsedTime > 3 ? "You are doing great" : "Keep going"}
        </button>
      )}

      <div
        className={styles.board[smallScreen ? "small" : "large"]}
        {...bind()}
      >
        {BOARD.map((row, rIndex) => (
          <div className={styles.row} key={rIndex}>
            {row.map((_, cIndex) => (
              <div className={styles.cell} key={cIndex}>
                {snake.map((segment, index) => {
                  if (segment.x === cIndex && segment.y === rIndex) {
                    return (
                      <div
                        className={clsx(
                          index !== 0 && styles.snake,
                          index === 0 && styles.snakeHead[direction]
                        )}
                        key={index}
                      />
                    );
                  }
                })}
                {foodCoordinates.x === cIndex &&
                foodCoordinates.y === rIndex ? (
                  <div className={styles.food}>{foodEmoji}</div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
