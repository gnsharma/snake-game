import { useDarkMode, useReadLocalStorage, useLocalStorage } from "usehooks-ts";

import * as styles from "./header-row.css";

import SunIcon from "src/assets/icons/sun.svg";
import MoonIcon from "src/assets/icons/moon.svg";
import RedThemeIcon from "src/assets/icons/red-theme-icon.svg";
import BlueThemeIcon from "src/assets/icons/blue-theme-icon.svg";
import GreenThemeIcon from "src/assets/icons/green-theme-icon.svg";

type HeaderRowProps = {
  currentScore: number;
};

const themeOptions: ThemeOptions[] = ["dark", "light", "green", "blue", "red"];
const themeToThemeIconMapping: Record<ThemeOptions, string> = {
  dark: MoonIcon,
  light: SunIcon,
  red: RedThemeIcon,
  green: GreenThemeIcon,
  blue: BlueThemeIcon,
};

const HeaderRow = ({ currentScore }: HeaderRowProps): JSX.Element => {
  const { isDarkMode, enable: enableDarkMode } = useDarkMode();
  const [currentTheme, setSelectedTheme] = useLocalStorage<ThemeOptions>(
    "selectedTheme",
    isDarkMode ? "dark" : "light"
  );
  const highestScore = useReadLocalStorage<null | number>("highestScore");

  const handleThemeToggle = () => {
    const currentThemeIndex = themeOptions.indexOf(currentTheme);
    const nextThemeIndex =
      currentThemeIndex < themeOptions.length - 1 ? currentThemeIndex + 1 : 0;
    setSelectedTheme(themeOptions[nextThemeIndex]);
    if (themeOptions[nextThemeIndex] === "dark") enableDarkMode();
  };

  return (
    <>
      <div className={styles.info}>
        <img
          src={themeToThemeIconMapping[currentTheme]}
          onClick={handleThemeToggle}
          className={styles.themeSelector}
        />
        <div className={styles.infoWrapper}>
          <div className={styles.scoreWrapper}>
            <span className={styles.infoTitle}> Your Score: </span>
            <span className={styles.infoValue}>{currentScore}</span>
          </div>

          {highestScore ? (
            <div className={styles.scoreWrapper}>
              <span className={styles.infoTitle}> Highest Score: </span>
              <span className={styles.infoValue}>{highestScore}</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default HeaderRow;
