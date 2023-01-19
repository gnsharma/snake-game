import { createTheme } from "@vanilla-extract/css";

import { vars } from "./contract.css";
import { commonVars } from "./common-theme-vars";
import { colors } from "./tokens";

export const lightThemeClass = createTheme(vars, {
  color: {
    background: {
      primary: colors.white,
      secondary: colors.black,
      accentPrimary: colors.gray300,
      focus: colors.gray50,
      dim: "#f1f1f1",
    },
    text: {
      primary: colors.black,
      secondary: colors.white,
      accentPrimary: colors.gray600,
      dim: colors.gray800,
      placeholder: colors.gray700,
      input: colors.gray900,
    },
    border: {
      primary: colors.black,
      secondary: colors.gray800,
    },
    gradient: {
      horizontal:
        "linear-gradient(90deg, #D478FF 0%, #7E59F6 59.5%, #503DC4 103.86%)",
    },
  },
  ...commonVars,
});
