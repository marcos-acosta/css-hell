import React, { useState, useEffect } from "react";
import Level from "../Level/Level";
import LevelSelect from "../LevelSelect/LevelSelect";
import { LEVEL_DATA_PATH } from "../../util";
import { useCookies } from "react-cookie";

const _DEV_STARTING_LEVEL = 1;

export default function App() {
  const [cookies, setCookie] = useCookies(["checkpoint"]);
  const [selectedLevel, setSelectedLevel] = useState(
    _DEV_STARTING_LEVEL || null
  );
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadGameData = () => {
    fetch(LEVEL_DATA_PATH)
      .then((r) => r.json())
      .then((data) => {
        setGameData(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadGameData();
  }, []);

  if (isLoading) {
    return;
  }
  const highestLevel = parseInt(cookies.checkpoint);

  const setHighestLevel = (levelNumber) =>
    levelNumber > highestLevel &&
    setCookie("checkpoint", levelNumber, {
      sameSite: "none",
      secure: true,
    });

  const increaseHighestLevel = () => {
    setHighestLevel(selectedLevel + 1);
  };

  const moveToNextLevel = () => {
    increaseHighestLevel();
    setSelectedLevel(selectedLevel + 1);
  };

  return selectedLevel ? (
    <Level
      levelData={gameData[selectedLevel]}
      levelNumber={selectedLevel}
      goHome={() => setSelectedLevel(null)}
      reset={loadGameData}
      moveToNextLevel={moveToNextLevel}
      increaseHighestLevel={increaseHighestLevel}
    />
  ) : (
    <LevelSelect
      highestLevel={highestLevel}
      gameData={gameData}
      setSelectedLevel={setSelectedLevel}
    />
  );
}
