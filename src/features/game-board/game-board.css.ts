import { style } from "@vanilla-extract/css";
import { url } from "inspector";
import { vars } from "src/styles/themes.css";

export const board = style({
  touchAction: "none",
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
  width: vars.fontSize.lg,
  height: vars.fontSize.lg,
  borderWidth: "0.25px",
  borderStyle: "dotted",
  borderColor: vars.colors.border,
});

export const snake = style({
  width: vars.fontSize.lg,
  height: vars.fontSize.lg,
  backgroundColor: vars.colors.red700,
});

export const snakeHead = style({
  backgroundColor: vars.colors.red600,
  width: vars.fontSize.lg,
  height: vars.fontSize.lg,
  // backgroundImage: "url('src/assets/icons/snake-head.svg?raw')",
});

export const food = style({
  width: vars.fontSize.lg,
  height: vars.fontSize.lg,
});

export const playAgain = style({
  fontWeight: "bold",
  fontSize: vars.fontSize.xl,
  boxShadow: vars.boxShadow.lg,
  borderRadius: vars.radii.sm,
  border: "none",
  padding: vars.space.sm,
  backgroundColor: vars.colors.background,
  color: vars.colors.primary,
});
