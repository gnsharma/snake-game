import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: {
      primary: "",
      secondary: "",
      accentPrimary: "",
      focus: "",
      dim: "",
    },
    text: {
      primary: "",
      secondary: "",
      accentPrimary: "",
      placeholder: "",
      input: "",
      dim: "",
    },
    border: {
      primary: "",
      secondary: "",
    },
    gradient: {
      horizontal: "",
    },
  },
  font: {
    body: "",
  },
  spacing: {
    xxs: "",
    xs: "",
    sm: "",
    md: "",
    gd: "",
    lg: "",
    xl: "",
    xxl: "",
  },
  text: {
    xs: "",
    sm: "",
    md: "",
    gd: "",
    lg: "",
    xl: "",
    xxl: "",
  },
  border: {
    solid: "",
    __raw: "",
    radius: {
      sm: "",
      md: "",
      lg: "",
      round: "",
    },
  },
  boxShadow: {
    sm: "",
    md: "",
    lg: "",
  },
});
