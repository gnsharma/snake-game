import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "src/styles/contract.css";
import { TOTAL_COLUMNS, TOTAL_ROWS } from "./game-board.constants";

const gameContainerBase = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
});
export const gameContainer = styleVariants({
  small: [
    gameContainerBase,
    { flexDirection: "column-reverse", gap: vars.spacing.xs },
  ],
  large: [gameContainerBase, { flexDirection: "column" }],
});

const boardBase = style({
  touchAction: "none",
  display: "grid",
  gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 1fr)`,
  gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)`,
  gridAutoFlow: "column",
  boxShadow: vars.boxShadow.md,
  width: "min-content",
  borderRadius: vars.border.radius.sm,
});
export const board = styleVariants({
  small: [boardBase, { gridTemplateRows: `repeat(${TOTAL_ROWS - 5}, 1fr)` }],
  large: [boardBase, {}],
});

export const row = style({
  display: "flex",
});

const cellBase = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  backgroundColor: vars.color.background.secondary,
});

export const cell = styleVariants({
  even: [cellBase, { filter: "brightness(1)" }],
  odd: [cellBase, { filter: "brightness(1.2)" }],
});

const snakeBase = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  padding: "2px",
  backgroundClip: "content-box",
  backgroundColor: vars.color.background.accentPrimary,
});
export const snake = styleVariants({
  even: [snakeBase, { filter: "contrast(10)" }],
  odd: [snakeBase, { filter: "contrast(10)" }],
});

const snakeSecondPartBase = style({});
export const snakeSecondPart = styleVariants({
  down: [
    snakeSecondPartBase,
    // { borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" },
  ],
  up: [
    snakeSecondPartBase,
    // { borderTopLeftRadius: "50%", borderTopRightRadius: "50%" },
  ],
  left: [
    snakeSecondPartBase,
    // { borderBottomLeftRadius: "50%", borderTopLeftRadius: "50%" },
  ],
  right: [
    snakeSecondPartBase,
    // { borderTopRightRadius: "50%", borderBottomRightRadius: "50%" },
  ],
});

const snakeTailBase = style({});
export const snakeTail = styleVariants({
  up: [
    snakeTailBase,
    // { borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" },
  ],
  down: [
    snakeTailBase,
    // { borderTopLeftRadius: "50%", borderTopRightRadius: "50%" },
  ],
  right: [
    snakeTailBase,
    // { borderBottomLeftRadius: "50%", borderTopLeftRadius: "50%" },
  ],
  left: [
    snakeTailBase,
    // { borderTopRightRadius: "50%", borderBottomRightRadius: "50%" },
  ],
});

const snakeHeadBase = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  backgroundImage: "url('src/assets/icons/snake-head.svg')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  transition: "100ms linear all",
});

export const snakeHead = styleVariants({
  right: [snakeHeadBase, { transform: "rotate(-90deg)" }],
  left: [snakeHeadBase, { transform: "rotate(90deg)" }],
  up: [snakeHeadBase, { transform: "rotate(-180deg)" }],
  down: [snakeHeadBase, { transform: "rotate(0deg)" }],
});

export const food = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  filter: "contrast(1.5)",
});
