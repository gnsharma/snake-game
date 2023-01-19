import GameBoard from "src/features/game-board";
import clsx from "clsx";
import { useDarkMode, useMediaQuery, useLocalStorage } from "usehooks-ts";

import { lightThemeClass } from "src/styles/themes/light-theme.css";
import { darkThemeClass } from "src/styles/themes/dark-theme.css";
import { greenThemeClass } from "src/styles/themes/green-theme.css";
import { blueThemeClass } from "src/styles/themes/blue-theme.css";
import { redThemeClass } from "src/styles/themes/red-theme.css";

import * as theme from "src/styles/theme.css";
import * as styles from "./app.css";

import LinkedinLogo from "src/assets/logos/linkedin.png";
import GithubLogo from "src/assets/logos/github.svg";
import GithubLogoWhite from "src/assets/logos/github-white.svg";

const themeToThemeClassMapping: Record<ThemeOptions, string> = {
  dark: darkThemeClass,
  light: lightThemeClass,
  red: redThemeClass,
  green: greenThemeClass,
  blue: blueThemeClass,
};

function App() {
  const { isDarkMode } = useDarkMode();
  const [selectedTheme] = useLocalStorage<ThemeOptions>(
    "selectedTheme",
    isDarkMode ? "dark" : "light"
  );

  const smallScreen = useMediaQuery("(max-height: 700px)");
  const mediumScreen = useMediaQuery("(min-height: 700px)");
  const screenSize = smallScreen ? "small" : mediumScreen ? "medium" : "large";

  return (
    <div
      className={clsx(
        themeToThemeClassMapping[selectedTheme],
        styles.app[screenSize],
        theme.width.full
      )}
    >
      <span className={styles.info[screenSize]}>
        Swipe on the board or use arrow keys to change direction.
      </span>
      <GameBoard />
      <div className={styles.footer}>
        <a href="https://github.com/gnsharma/snake-game" target="_blank">
          <img
            src={
              ["dark"].includes(selectedTheme) ? GithubLogoWhite : GithubLogo
            }
            className={styles.logo}
            alt="GitHub Logo"
          />
        </a>
        <a href="https://www.linkedin.com/in/gnsharma0810/" target="_blank">
          <img src={LinkedinLogo} className={styles.logo} alt="Linkedin Logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
