import React from "react";
import LevelSelect from "../LevelSelect/LevelSelect";
import { useCookies } from "react-cookie";

export default function App() {
  const [cookies, setCookie] = useCookies(["checkpoint"]);

  const highestLevel = parseInt(cookies.checkpoint);

  const setHighestLevel = (levelNumber) =>
    levelNumber > highestLevel &&
    setCookie("checkpoint", levelNumber, {
      sameSite: "none",
      secure: true,
    });

  return (
    <LevelSelect
      highestLevel={highestLevel}
      setHighestLevel={setHighestLevel}
    />
  );
}
