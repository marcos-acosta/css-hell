import React, { useEffect, useState } from "react";
import { LEVEL_DATA_PATH } from "../../util";
import LevelButton from "./LevelButton/LevelButton";

const _DEV_STARTING_LEVEL = 1;

export default function LevelSelect(props) {
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(
    _DEV_STARTING_LEVEL || null
  );

  useEffect(() => {
    fetch(LEVEL_DATA_PATH)
      .then((r) => r.json())
      .then((data) => {
        setGameData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return;
  }

  return selectedLevel ? (
    <div>level {selectedLevel}!</div>
  ) : (
    <div>
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
  );
}
