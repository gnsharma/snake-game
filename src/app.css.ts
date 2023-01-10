import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.md,
  margin: vars.space.lg,
  // backgroundColor: vars.colors.background,
});

export const header = style({
  display: "flex",
  gap: vars.space.md,
  padding: vars.space.xs,
});

export const logo = style({
  width: vars.space.lg,
  height: vars.space.lg,
});
