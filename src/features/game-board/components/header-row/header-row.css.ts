import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const info = style({
  display: "flex",
  gap: vars.space.md,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: vars.boxShadow.md,
  padding: vars.space.md,
  color: vars.colors.primary,
  borderRadius: vars.radii.sm,
});

export const infoWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  alignItems: "center",
  justifyContent: "center",
});

export const scoreWrapper = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  justifyContent: "center",
});

export const infoTitle = style({
  fontWeight: "bold",
  fontSize: vars.fontSize.md,
});

export const infoValue = style({
  fontWeight: "bold",
  fontSize: vars.fontSize.lg,
});

export const darkModeToggle = style({
  color: vars.colors.primary,
});

export const playAgain = style([
  infoValue,
  {
    fontSize: vars.fontSize.xl,
    boxShadow: vars.boxShadow.lg,
    borderRadius: vars.radii.sm,
    border: "none",
    padding: vars.space.sm,
    backgroundColor: vars.colors.background,
    color: vars.colors.primary,
  },
]);
