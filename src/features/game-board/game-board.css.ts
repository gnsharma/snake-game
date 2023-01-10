import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const board = style({
  display: "grid",
  gridTemplateColumns: "repeat(20, 1fr)",
  gridTemplateRows: "repeat(30, 1fr)",
  gridAutoFlow: "column",
  boxShadow: vars.boxShadow.md,
  width: "min-content",
});

export const row = style({
  display: "flex",
});

export const cell = style({
  width: vars.space.md,
  height: vars.space.md,
  backgroundColor: vars.colors.background,
});

export const snake = style({
  width: vars.space.md,
  height: vars.space.md,
  backgroundColor: vars.colors.blue700,
});

export const snakeHead = style({
  backgroundColor: vars.colors.blue600,
});

export const food = style({
  width: vars.space.md,
  height: vars.space.md,
  backgroundColor: vars.colors.green400,
});

export const info = style({
  display: "flex",
  gap: vars.space.xl,
  alignItems: "center",
  justifyContent: "center",
  boxShadow: vars.boxShadow.md,
  padding: vars.space.md,
});
