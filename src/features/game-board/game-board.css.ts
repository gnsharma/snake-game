import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const board = style({
  display: "grid",
  gridTemplateColumns: "repeat(20, 1fr)",
  gridTemplateRows: "repeat(30, 1fr)",
  gridAutoFlow: "column",
  boxShadow: vars.boxShadow.md,
  width: "min-content",
  backgroundColor: vars.colors.primary,
  borderRadius: vars.radii.sm,
});

export const row = style({
  display: "flex",
});

export const cell = style({
  width: vars.space.md,
  height: vars.space.md,
});

export const snake = style({
  width: vars.space.md,
  height: vars.space.md,
  backgroundColor: vars.colors.red700,
});

export const snakeHead = style({
  backgroundColor: vars.colors.red600,
});

export const food = style({
  width: vars.space.md,
  height: vars.space.md,
  backgroundColor: vars.colors.green400,
});
