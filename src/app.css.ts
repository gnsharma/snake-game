import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: vars.space.md,
  padding: vars.space.lg,
  backgroundColor: vars.colors.background,
  width: "100%",
  height: "100%",
  color: vars.colors.primary,
});

export const footer = style({
  display: "flex",
  gap: vars.space.md,
  padding: vars.space.xs,
  marginTop: "auto",
});

export const logo = style({
  width: vars.space.lg,
  height: vars.space.lg,
});
