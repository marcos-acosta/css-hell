import React from "react";
import styles from "./LevelSelect.module.css";
import LevelButton from "./LevelButton/LevelButton";
import { LAST_LEVEL_NUMBER } from "../../util";

export default function LevelSelect(props) {
  return (
    <div className={styles.levelSelectContainer}>
      <div className={styles.gameTitle}>
        <span className={styles.gameTitleText}>css hell</span>
      </div>
      <div
        className={styles.backToSpiel}
        role="button"
        onClick={props.showIntro}
      >
        ← show intro again
      </div>
      <div className={styles.levelsContainer}>
        {Object.entries(props.gameData).map(([levelNumber, levelData], i) => {
          const isUnlocked = props.highestCompletedLevel + 1 >= levelNumber;
          const canSkipToMessage = props.highestCompletedLevel >= levelNumber;
          if (!isUnlocked && parseInt(levelNumber) === LAST_LEVEL_NUMBER) {
            return null;
          }
          return (
            <div className={styles.levelContainer} key={i}>
              <LevelButton
                isUnlocked={isUnlocked}
                levelNumber={levelNumber}
                setSelectedLevel={props.setSelectedLevel}
                levelName={levelData.levelName}
                showMessage={canSkipToMessage}
                showMessageByLevelNumber={props.showMessageByLevelNumber}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.madeBy}>
        made by{" "}
        <a href="https://marcos.ac" target="_blank" rel="noreferrer">
          marcos acosta
        </a>{" "}
        (2023)
      </div>
    </div>
  );
}
