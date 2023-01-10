import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.md,
  margin: vars.space.lg,
});
