import * as React from "react";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";
import { useDrag } from "@use-gesture/react";

import { useInterval, useReducerWithSideEffects } from "src/common/hooks";

import { TOTAL_COLUMNS, TOTAL_ROWS, BOARD } from "./game-board.constants";
import { gameReducer, initialBoardState } from "./game-board.reducer";

import HeaderRow from "./components/header-row";

import * as styles from "./game-board.css";

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
        const uniqueSnakeCoordinates = new Set(
          state.snake.map((snakePart) => `${snakePart.x}-${snakePart.y}`)
        ).size;
        if (uniqueSnakeCoordinates !== state.snake.length) {
          state.currentScore > (highestScore ?? 0) &&
            setHighestScore(state.currentScore);
          return { type: "GAME_OVER" } as GAME_ACTIONS;
        }
        if (
          snakeHead.x < 0 ||
          snakeHead.x >= TOTAL_COLUMNS ||
          snakeHead.y < 0 ||
          snakeHead.y >= TOTAL_ROWS
        ) {
          state.currentScore > (highestScore ?? 0) &&
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
      foodEmoji,
    },
    dispatch,
  ] = useReducerWithSideEffects(
    gameReducer,
    gameReducerSideEffects,
    initialBoardState
  );

  const bind = useDrag(
    ({ last, swipe: [swipeX, swipeY], offset: [offsetX, offsetY] }) => {
      if (last) {
        let swipeDirection: Direction | null = null;
        const largetOffset = Math.abs(offsetX) >= Math.abs(offsetY) ? "x" : "y";

        if (swipeX === 1) {
          if (swipeY === 0) {
            swipeDirection = "right";
          } else if (swipeY === 1) {
            swipeDirection = largetOffset === "x" ? "right" : "down";
          } else if (swipeY === -1) {
            swipeDirection = largetOffset === "x" ? "right" : "up";
          }
        } else if (swipeX === -1) {
          if (swipeY === 0) {
            swipeDirection = "left";
          } else if (swipeY === 1) {
            swipeDirection = largetOffset === "x" ? "left" : "down";
          } else if (swipeY === -1) {
            swipeDirection = largetOffset === "x" ? "left" : "up";
          }
        } else if (swipeX === 0) {
          if (swipeY === 1) {
            swipeDirection = "down";
          } else if (swipeY === -1) swipeDirection = "up";
        }

        console.log(
          swipeX,
          swipeY,
          last,
          offsetX,
          offsetY,
          largetOffset,
          swipeDirection
        );

        if (swipeDirection === "left") {
          dispatch({
            type: "ARROW_LEFT_KEY_PRESSED",
            payload: { direction: "left" },
          });
        } else if (swipeDirection === "up") {
          dispatch({
            type: "ARROW_UP_KEY_PRESSED",
            payload: { direction: "up" },
          });
        } else if (swipeDirection === "right") {
          dispatch({
            type: "ARROW_RIGHT_KEY_PRESSED",
            payload: { direction: "right" },
          });
        } else if (swipeDirection === "down") {
          dispatch({
            type: "ARROW_DOWN_KEY_PRESSED",
            payload: { direction: "down" },
          });
        }
      }
    },
    { swipe: { duration: 1000, distance: [0, 0], velocity: [0, 0] } }
  );

  const snakeIntervalDuration =
    currentScore < 50 ? 500 : Math.max(150, 500 / (currentScore / 50));
  const snakeInterval = useInterval(() => {
    dispatch({ type: "SNAKE_INTERVAL_TICKED" });
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
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [snake]);

  const onPlayAgainClick = () => {
    dispatch({ type: "RESET_BOARD" });
  };

  return (
    <>
      <HeaderRow currentScore={currentScore} />
      <div className={styles.board} {...bind()}>
        {BOARD.map((row, rIndex) => (
          <div className={styles.row} key={rIndex}>
            {row.map((col, cIndex) => (
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
      {isGameOver && (
        <button onClick={onPlayAgainClick} className={styles.playAgain}>
          Play Again
        </button>
      )}
    </>
  );
};

export default GameBoard;
