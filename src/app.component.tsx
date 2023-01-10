import { GameBoard } from "src/features/game-board";
import clsx from "clsx";

import { lightThemeClass, darkThemeClass } from "src/styles/themes.css";
import * as styles from "./app.css";

function App() {
  return (
    <div className={clsx(darkThemeClass, styles.app)}>
      <GameBoard />
      <div>GIthub,, linkedin</div>
    </div>
  );
}

export default App;
