import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "src/styles/contract.css";

const appBase = style({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: vars.spacing.sm,
  padding: vars.spacing.lg,
  backgroundColor: vars.color.background.primary,
  color: vars.color.text.primary,
});
export const app = styleVariants({
  small: [appBase, { paddingTop: vars.spacing.xxs }],
  medium: [appBase, {}],
  large: [appBase, {}],
});

export const info = styleVariants({
  small: { fontSize: vars.text.sm },
  medium: {},
  large: {},
});

export const footer = style({
  display: "flex",
  gap: vars.spacing.sm,
  marginTop: "auto",
});

export const logo = style({
  width: vars.spacing.gd,
  height: vars.spacing.gd,
});
