import { GameBoard } from "src/features/game-board";
import clsx from "clsx";
import { useDarkMode } from "usehooks-ts";

import { lightThemeClass, darkThemeClass } from "src/styles/themes.css";
import * as styles from "./app.css";

import LinkedinLogo from "src/assets/logos/linkedin.png";
import GithubLogo from "src/assets/logos/github.svg";
import GithubLogoWhite from "src/assets/logos/github-white.svg";
import SunIcon from "src/assets/icons/sun.svg";
import MoonIcon from "src/assets/icons/moon.svg";

function App() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div
      className={clsx(
        isDarkMode ? darkThemeClass : lightThemeClass,
        styles.app
      )}
    >
      <div className={styles.header}>
        <a href="https://www.linkedin.com/in/gnsharma0810/" target="_blank">
          <img src={LinkedinLogo} className={styles.logo} />
        </a>
        <a href="https://github.com/gnsharma/snake-game" target="_blank">
          <img
            src={isDarkMode ? GithubLogo : GithubLogoWhite}
            className={styles.logo}
          />
        </a>
        <img src={isDarkMode ? MoonIcon : SunIcon} onClick={toggle} />
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
