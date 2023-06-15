import React, { useEffect, useState } from "react";
import styles from "./LevelSelect.module.css";
import { LEVEL_DATA_PATH } from "../../util";
import LevelButton from "./LevelButton/LevelButton";
import Level from "../Level/Level";

const _DEV_STARTING_LEVEL = 1;

export default function LevelSelect(props) {
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(
    _DEV_STARTING_LEVEL || null
  );

  const loadGameData = () => {
    fetch(LEVEL_DATA_PATH)
      .then((r) => r.json())
      .then((data) => {
        setGameData(data);
        setIsLoading(false);
      });
  };

  const moveToNextLevel = () => {
    props.setHighestLevel(selectedLevel + 1);
    setSelectedLevel(selectedLevel + 1);
  };

  useEffect(() => {
    loadGameData();
  }, []);

  if (isLoading) {
    return;
  }

  return selectedLevel ? (
    <Level
      levelData={gameData[selectedLevel]}
      levelNumber={selectedLevel}
      goHome={() => setSelectedLevel(null)}
      reset={loadGameData}
      moveToNextLevel={moveToNextLevel}
    />
  ) : (
    <div className={styles.levelSelectContainer}>
      <div className={styles.gameTitle}>
        <span className={styles.gameTitleText}>code-monkey</span>
      </div>
      <div className={styles.levelsContainer}>
        {Object.entries(gameData).map(([levelNumber, levelData], i) => (
          <LevelButton
            key={i}
            isUnlocked={props.highestLevel >= levelNumber}
            levelNumber={levelNumber}
            setSelectedLevel={setSelectedLevel}
            levelName={levelData.levelName}
          />
        ))}
      </div>
    </div>
  );
}
