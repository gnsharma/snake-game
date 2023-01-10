type Direction = "right" | "left" | "up" | "down";

type Coordinate = { x: number; y: number };

type Snake = Array<Coordinate>;

type BoardState = {
  foodCoordinates: { x: null | number; y: null | number };
  hasFoodBeenCollected: boolean;
  currentScore: number;
  elapsedTime: number;
  snake: Snake;
  direction: Direction;
  isGameOver: boolean;
};
type GAME_ACTIONS =
  | {
      type: "ARROW_UP_KEY_PRESSED";
      payload: { direction: "up" };
    }
  | { type: "ARROW_DOWN_KEY_PRESSED"; payload: { direction: "down" } }
  | { type: "ARROW_RIGHT_KEY_PRESSED"; payload: { direction: "right" } }
  | { type: "ARROW_LEFT_KEY_PRESSED"; payload: { direction: "left" } }
  | { type: "SNAKE_INTERVAL_TICKED" }
  | { type: "GENERATE_FOOD" }
  | { type: "TIME_INTERVAL_TICKED" }
  | { type: "FOOD_COLLECTED" }
  | { type: "RESET_BOARD" }
  | { type: "GAME_OVER" };
