import { SYSTEM_FONT_STACK } from "./tokens";

export const commonVars = {
  font: {
    body: SYSTEM_FONT_STACK,
  },
  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    sm: "1rem",
    md: "1.125rem",
    gd: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    xxl: "5rem",
  },
  text: {
    xs: "0.5rem",
    sm: "0.8rem",
    md: "1rem",
    gd: "1.125rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
  },
  border: {
    solid: "1.5px solid",
    __raw: "1.5px",
    radius: {
      sm: "3px",
      md: "6px",
      lg: "9px",
      round: "100%",
    },
  },
  boxShadow: {
    sm: "0 2px 4px 0px rgba(28,28,28,.1), 0 2px 2px -2px rgba(28,28,28,.1), 0 4px 4px -4px rgba(28,28,28,.2)",
    md: "0 2px 4px 0px rgba(28,28,28,.1), 0 8px 8px -4px rgba(28,28,28,.1), 0 12px 12px -8px rgba(28,28,28,.2)",
    lg: "0 2px 4px 0px rgba(28,28,28,.1), 0 12px 12px -4px rgba(28,28,28,.1), 0 20px 20px -12px rgba(28,28,28,.2)",
  },
};
