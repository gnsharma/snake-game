import { useDarkMode } from "usehooks-ts";

import * as styles from "./header-row.css";

import SunIcon from "src/assets/icons/sun.svg";
import MoonIcon from "src/assets/icons/moon.svg";

type HeaderRowProps = {
  currentScore: number;
  highestScore: null | number;
  isGameOver: boolean;
  onPlayAgainClick: () => void;
};

const HeaderRow = ({
  currentScore,
  highestScore,
  isGameOver,
  onPlayAgainClick,
}: HeaderRowProps): JSX.Element => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <>
      <div className={styles.info}>
        <img
          src={isDarkMode ? MoonIcon : SunIcon}
          onClick={toggle}
          className={styles.darkModeToggle}
        />
        <div className={styles.infoWrapper}>
          <div className={styles.scoreWrapper}>
            <span className={styles.infoTitle}> Your Score: </span>
            <span className={styles.infoValue}>{currentScore}</span>
          </div>

          <div className={styles.scoreWrapper}>
            <span className={styles.infoTitle}> Highest Score: </span>
            <span className={styles.infoValue}>{highestScore}</span>
          </div>
        </div>
      </div>
      {isGameOver && (
        <button onClick={onPlayAgainClick} className={styles.playAgain}>
          Play Again
        </button>
      )}
    </>
  );
};

export default HeaderRow;
