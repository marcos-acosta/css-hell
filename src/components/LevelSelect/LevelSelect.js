import React from "react";
import styles from "./LevelSelect.module.css";
import LevelButton from "./LevelButton/LevelButton";
import { LAST_LEVEL_NUMBER, combineClassNames } from "../../util";

export default function LevelSelect(props) {
  return (
    <div className={styles.levelSelectContainer}>
      <div className={styles.gameTitle}>
        <span className={styles.gameTitleText}>code-monkey</span>
      </div>
      <div className={styles.levelsContainer}>
        {Object.entries(props.gameData).map(([levelNumber, levelData], i) => {
          const isUnlocked = props.highestCompletedLevel + 1 >= levelNumber;
          if (!isUnlocked && parseInt(levelNumber) === LAST_LEVEL_NUMBER) {
            return null;
          }
          const canSkipToMessage = props.highestCompletedLevel >= levelNumber;
          return (
            <div className={styles.levelContainer} key={i}>
              <LevelButton
                isUnlocked={isUnlocked}
                levelNumber={levelNumber}
                setSelectedLevel={props.setSelectedLevel}
                levelName={levelData.levelName}
              />
              {canSkipToMessage && levelData.completionMessage && (
                <button
                  className={styles.messageButton}
                  onClick={() => props.showMessageByLevelNumber(levelNumber)}
                >
                  <span
                    className={combineClassNames(
                      "material-symbols-outlined",
                      styles.noteSymbol
                    )}
                  >
                    sticky_note_2
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
