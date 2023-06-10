import React from "react";
import GameLogic from "../GameLogic/GameLogic";
import { useCookies } from "react-cookie";

export default function App() {
  const [cookies, setCookie] = useCookies(["checkpoint"]);

  const saveLevelCheckpoint = (levelNumber) =>
    setCookie("checkpoint", levelNumber);

  const initLevelNumber = parseInt(cookies.checkpoint);

  return (
    <GameLogic
      initLevelNumber={initLevelNumber}
      saveLevelCheckpoint={saveLevelCheckpoint}
    />
  );
}
