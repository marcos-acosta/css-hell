import React from "react";
import GameLogic from "../GameLogic/GameLogic";
import { useCookies } from "react-cookie";

const _DONT_UPDATE_COOKIES = true;

export default function App() {
  const [cookies, setCookie] = useCookies(["checkpoint"]);

  const saveLevelCheckpoint = (levelNumber) =>
    !_DONT_UPDATE_COOKIES && setCookie("checkpoint", levelNumber);

  const initLevelNumber = parseInt(cookies.checkpoint);

  return (
    <GameLogic
      initLevelNumber={initLevelNumber}
      saveLevelCheckpoint={saveLevelCheckpoint}
    />
  );
}
