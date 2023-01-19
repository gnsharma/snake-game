import { createTheme } from "@vanilla-extract/css";

import { vars } from "../contract.css";
import { commonVars } from "../common-theme-vars";
import { colors } from "../tokens";

export const redThemeClass = createTheme(vars, {
  color: {
    background: {
      primary: colors.red300,
      secondary: colors.red800,
      accentPrimary: colors.red200,
      focus: colors.red600,
      dim: colors.red700,
    },
    text: {
      primary: colors.black,
      secondary: colors.gray900,
      accentPrimary: colors.gray200,
      dim: colors.gray300,
      placeholder: colors.gray400,
      input: colors.gray500,
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
