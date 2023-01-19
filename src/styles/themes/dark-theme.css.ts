import { createTheme } from "@vanilla-extract/css";

import { vars } from "../contract.css";
import { commonVars } from "../common-theme-vars";
import { colors } from "../tokens";

export const darkThemeClass = createTheme(vars, {
  color: {
    background: {
      primary: colors.black,
      secondary: colors.gray700,
      accentPrimary: colors.white,
      focus: "#0C0C0E",
      dim: "#0A0A0B",
    },
    text: {
      primary: colors.white,
      secondary: colors.black,
      accentPrimary: "#535364",
      dim: "#2C2C36",
      placeholder: "#46465B",
      input: "#9696AD",
    },
    border: {
      primary: colors.black,
      secondary: colors.white,
    },
    gradient: {
      horizontal:
        "linear-gradient(90deg, #D478FF 0%, #7E59F6 59.5%, #503DC4 103.86%)",
    },
  },
  ...commonVars,
});
