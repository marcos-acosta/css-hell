import React, { useState, useEffect } from "react";
import Level from "../Level/Level";
import LevelSelect from "../LevelSelect/LevelSelect";
import { LEVEL_DATA_PATH } from "../../util";
import { useCookies } from "react-cookie";
import MessageScreen from "../MessageScreen/MessageScreen";

const _DEV_STARTING_LEVEL = null;

export default function App() {
  const [cookies, setCookie] = useCookies(["checkpoint"]);
  const [selectedLevel, setSelectedLevel] = useState(
    _DEV_STARTING_LEVEL || null
  );
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingMessage, setIsShowingMessage] = useState(false);

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
    setIsShowingMessage(false);
  };

  const handleNextButton = () => {
    if (gameData[selectedLevel].completionMessage) {
      setIsShowingMessage(true);
    } else {
      moveToNextLevel();
    }
  };

  return selectedLevel ? (
    isShowingMessage ? (
      <MessageScreen
        messageData={gameData[selectedLevel].completionMessage}
        moveToNextLevel={moveToNextLevel}
      />
    ) : (
      <Level
        levelData={gameData[selectedLevel]}
        levelNumber={selectedLevel}
        goHome={() => setSelectedLevel(null)}
        reset={loadGameData}
        handleNextButton={handleNextButton}
        increaseHighestLevel={increaseHighestLevel}
      />
    )
  ) : (
    <LevelSelect
      highestLevel={highestLevel}
      gameData={gameData}
      setSelectedLevel={setSelectedLevel}
    />
  );
}
