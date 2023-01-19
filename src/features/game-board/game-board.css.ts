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
  backgroundColor: vars.color.background.accentPrimary,
  borderRadius: vars.border.radius.sm,
});
export const board = styleVariants({
  small: [boardBase, { gridTemplateRows: `repeat(${TOTAL_ROWS - 5}, 1fr)` }],
  large: [boardBase, {}],
});

export const row = style({
  display: "flex",
});

export const cell = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  borderWidth: "0.25px",
  borderStyle: "dotted",
  borderColor: vars.color.border.primary,
});

export const snake = style({
  width: vars.spacing.md,
  height: vars.spacing.md,
  padding: "3px",
  backgroundClip: "content-box",
  backgroundColor: vars.color.background.secondary,
});

export const snakeHeadBase = style({
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
});

export const playAgain = style({
  fontWeight: "bold",
  fontSize: vars.text.xl,
  boxShadow: vars.boxShadow.lg,
  borderRadius: vars.border.radius.sm,
  border: "none",
  padding: vars.spacing.sm,
  backgroundColor: vars.color.background.primary,
  color: vars.color.text.primary,
});
