export const detectSwipeDirection = ({
  swipeX,
  swipeY,
  offsetX,
  offsetY,
}: {
  swipeX: number;
  swipeY: number;
  offsetX: number;
  offsetY: number;
}) => {
  let swipeDirection:
    | "ArrowLeft"
    | "ArrowRight"
    | "ArrowUp"
    | "ArrowDown"
    | null = null;
  const largetOffset = Math.abs(offsetX) >= Math.abs(offsetY) ? "x" : "y";

  if (swipeX === 1) {
    if (swipeY === 0) {
      swipeDirection = "ArrowRight";
    } else if (swipeY === 1) {
      swipeDirection = largetOffset === "x" ? "ArrowRight" : "ArrowDown";
    } else if (swipeY === -1) {
      swipeDirection = largetOffset === "x" ? "ArrowRight" : "ArrowUp";
    }
  } else if (swipeX === -1) {
    if (swipeY === 0) {
      swipeDirection = "ArrowLeft";
    } else if (swipeY === 1) {
      swipeDirection = largetOffset === "x" ? "ArrowLeft" : "ArrowDown";
    } else if (swipeY === -1) {
      swipeDirection = largetOffset === "x" ? "ArrowLeft" : "ArrowUp";
    }
  } else if (swipeX === 0) {
    if (swipeY === 1) {
      swipeDirection = "ArrowDown";
    } else if (swipeY === -1) swipeDirection = "ArrowUp";
  }

  console.log(swipeX, swipeY, offsetX, offsetY, largetOffset, swipeDirection);
  return swipeDirection;
};

export const dispatchArrowKeyEvent = (
  eventValue: string,
  dispatch: (value: GAME_ACTIONS) => void
) => {
  if (eventValue === "ArrowLeft") {
    dispatch({
      type: "ARROW_LEFT_KEY_PRESSED",
      payload: { direction: "left" },
    });
  } else if (eventValue === "ArrowUp") {
    dispatch({
      type: "ARROW_UP_KEY_PRESSED",
      payload: { direction: "up" },
    });
  } else if (eventValue === "ArrowRight") {
    dispatch({
      type: "ARROW_RIGHT_KEY_PRESSED",
      payload: { direction: "right" },
    });
  } else if (eventValue === "ArrowDown") {
    dispatch({
      type: "ARROW_DOWN_KEY_PRESSED",
      payload: { direction: "down" },
    });
  }
};
