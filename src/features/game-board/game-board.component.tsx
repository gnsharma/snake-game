import * as React from "react";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";

import { useInterval, useReducerWithSideEffects } from "../../common/hooks";

import { TOTAL_COLUMNS, TOTAL_ROWS, BOARD } from "./game-board.constants";
import { gameReducer, initialBoardState } from "./game-board.reducer";

import * as styles from "./game-board.css";

// TODO: detect body collision
// TODO: block direction change which results in body collision
// TODO: css improvements
// TODO: responsiveness
// TODO: link preview generation

const GameBoard = () => {
  const [highestScore, setHighestScore] = useLocalStorage<null | number>(
    "highestScore",
    null
  );

  const gameReducerSideEffects = (state: BoardState, action: GAME_ACTIONS) => {
    switch (action.type) {
      case "ARROW_DOWN_KEY_PRESSED":
      case "ARROW_RIGHT_KEY_PRESSED":
      case "ARROW_LEFT_KEY_PRESSED":
      case "ARROW_UP_KEY_PRESSED":
      case "SNAKE_INTERVAL_TICKED":
      case "GENERATE_FOOD": {
        const snakeHead = state.snake[0];
        if (
          snakeHead.x < 0 ||
          snakeHead.x >= TOTAL_COLUMNS ||
          snakeHead.y < 0 ||
          snakeHead.y >= TOTAL_ROWS
        ) {
          setHighestScore(state.currentScore);
          return { type: "GAME_OVER" } as GAME_ACTIONS;
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
    },
    dispatch,
  ] = useReducerWithSideEffects(
    gameReducer,
    gameReducerSideEffects,
    initialBoardState
  );

  const snakeInterval = useInterval(() => {
    dispatch({ type: "SNAKE_INTERVAL_TICKED" });
  }, 500);
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
    if (!isGameOver) {
      snakeInterval.set();
      foodInterval.set();
      timeInterval.set();
    }
    return () => {
      snakeInterval.clear();
      foodInterval.clear();
      timeInterval.clear();
    };
  }, [isGameOver]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      snakeInterval.clear();
      if (event.code === "ArrowLeft") {
        dispatch({
          type: "ARROW_LEFT_KEY_PRESSED",
          payload: { direction: "left" },
        });
      } else if (event.code === "ArrowUp") {
        dispatch({
          type: "ARROW_UP_KEY_PRESSED",
          payload: { direction: "up" },
        });
      } else if (event.code === "ArrowRight") {
        dispatch({
          type: "ARROW_RIGHT_KEY_PRESSED",
          payload: { direction: "right" },
        });
      } else if (event.code === "ArrowDown") {
        dispatch({
          type: "ARROW_DOWN_KEY_PRESSED",
          payload: { direction: "down" },
        });
      }
      !isGameOver && snakeInterval.set();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [snake]);

  const handlePlayAgain = () => {
    dispatch({ type: "RESET_BOARD" });
  };

  return (
    <>
      <div className={styles.info}>
        <span> Your Score: {currentScore}</span>
        <span> Highest Score: {highestScore}</span>
        {isGameOver && <button onClick={handlePlayAgain}> Play again</button>}
      </div>
      <div className={styles.board}>
        {BOARD.map((row, rIndex) => (
          <div className={styles.row} key={rIndex}>
            {row.map((col, cIndex) => (
              <div className={styles.cell} key={cIndex}>
                {snake.map((segment, index) => {
                  if (segment.x === cIndex && segment.y === rIndex) {
                    return (
                      <div
                        className={clsx(
                          styles.snake,
                          index === 0 && styles.snakeHead
                        )}
                        key={index}
                      />
                    );
                  }
                })}
                {foodCoordinates.x === cIndex &&
                foodCoordinates.y === rIndex ? (
                  <div className={styles.food} />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
