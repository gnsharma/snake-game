import { GameBoard } from "src/features/game-board";
import clsx from "clsx";
import { useDarkMode } from "usehooks-ts";

import { lightThemeClass, darkThemeClass } from "src/styles/themes.css";
import * as styles from "./app.css";

import LinkedinLogo from "src/assets/logos/linkedin.png";
import GithubLogo from "src/assets/logos/github.svg";
import GithubLogoWhite from "src/assets/logos/github-white.svg";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={clsx(
        isDarkMode ? darkThemeClass : lightThemeClass,
        styles.app
      )}
    >
      <GameBoard />
      <div className={styles.footer}>
        <a href="https://github.com/gnsharma/snake-game" target="_blank">
          <img
            src={isDarkMode ? GithubLogoWhite : GithubLogo}
            className={styles.logo}
          />
        </a>
        <a href="https://www.linkedin.com/in/gnsharma0810/" target="_blank">
          <img src={LinkedinLogo} className={styles.logo} />
        </a>
      </div>
    </div>
  );
}

export default App;
