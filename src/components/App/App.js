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
  const [isRevisitingMessage, setIsRevisitingMessage] = useState(false);

  const loadGameData = () => {
    setIsLoading(true);
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

  const highestCompletedLevel = cookies.checkpoint
    ? parseInt(cookies.checkpoint)
    : 0;

  const setHighestCompletedLevel = (levelNumber) =>
    levelNumber > highestCompletedLevel &&
    setCookie("checkpoint", levelNumber, {
      sameSite: "none",
      secure: true,
    });

  const clearThisLevel = () => {
    setHighestCompletedLevel(selectedLevel);
  };

  const moveToNextLevel = () => {
    clearThisLevel();
    setHighestCompletedLevel(selectedLevel);
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

  const handleNextFromMessageScreen = () => {
    if (isRevisitingMessage) {
      setSelectedLevel(null);
      setIsRevisitingMessage(false);
      setIsShowingMessage(false);
    } else {
      moveToNextLevel();
    }
  };

  const showMessageByLevelNumber = (levelNumber) => {
    setSelectedLevel(levelNumber);
    setIsShowingMessage(true);
    setIsRevisitingMessage(true);
  };

  return selectedLevel ? (
    isShowingMessage ? (
      <MessageScreen
        messageData={gameData[selectedLevel].completionMessage}
        moveToNextLevel={handleNextFromMessageScreen}
      />
    ) : (
      <Level
        levelData={gameData[selectedLevel]}
        levelNumber={selectedLevel}
        goHome={() => setSelectedLevel(null)}
        reset={loadGameData}
        handleNextButton={handleNextButton}
        clearThisLevel={clearThisLevel}
      />
    )
  ) : (
    <LevelSelect
      highestCompletedLevel={highestCompletedLevel}
      gameData={gameData}
      setSelectedLevel={setSelectedLevel}
      showMessageByLevelNumber={showMessageByLevelNumber}
    />
  );
}
