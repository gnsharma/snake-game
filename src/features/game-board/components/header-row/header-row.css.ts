import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/contract.css";

export const info = style({
  display: "flex",
  gap: vars.spacing.md,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: vars.boxShadow.md,
  padding: vars.spacing.xs,
  color: vars.color.text.primary,
  borderRadius: vars.border.radius.sm,
});

export const infoWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing.sm,
  alignItems: "center",
  justifyContent: "center",
});

export const scoreWrapper = style({
  display: "flex",
  gap: vars.spacing.xs,
  alignItems: "center",
  justifyContent: "center",
});

export const infoTitle = style({
  fontWeight: "bold",
  fontSize: vars.text.md,
});

export const infoValue = style({
  fontWeight: "bold",
  fontSize: vars.text.lg,
});

export const darkModeToggle = style({
  color: vars.color.text.primary,
  cursor: "pointer",
});
