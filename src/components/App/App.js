import React, { useEffect, useState } from "react";
import Arena from "../Arena/Arena";
import CssEditor from "../CssEditor/CssEditor";

export default function App() {
  const [levelNumber, _] = useState(1);
  const [levelData, setLevelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("data/levels.json")
      .then((r) => r.json())
      .then((data) => {
        setLevelData(data["levels"]);
        setLoading(false);
      });
  }, []);

  const { avatarBaseCss, goalCss, title, obstacles } = loading
    ? {}
    : levelData.find((level) => parseInt(level.number) === levelNumber);

  return (
    !loading && (
      <>
        <Arena />
        <CssEditor baseCss={avatarBaseCss} />
      </>
    )
  );
}
