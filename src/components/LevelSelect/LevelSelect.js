import React from "react";
import styles from "./LevelSelect.module.css";
import LevelButton from "./LevelButton/LevelButton";

export default function LevelSelect(props) {
  return (
    <div className={styles.levelSelectContainer}>
      <div className={styles.gameTitle}>
        <span className={styles.gameTitleText}>code-monkey</span>
      </div>
      <div className={styles.levelsContainer}>
        {Object.entries(props.gameData).map(([levelNumber, levelData], i) => (
          <LevelButton
            key={i}
            isUnlocked={props.highestLevel >= levelNumber}
            levelNumber={levelNumber}
            setSelectedLevel={props.setSelectedLevel}
            levelName={levelData.levelName}
          />
        ))}
      </div>
    </div>
  );
}
