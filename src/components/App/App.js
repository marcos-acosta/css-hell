import React, { useEffect, useState } from "react";
import Arena from "../Arena/Arena";
import CssEditor from "../CssEditor/CssEditor";
import { uid } from "uid/secure";
import MemoryScreen from "../MemoryScreen/MemoryScreen";

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/, (x) => x.slice(1).toUpperCase());
};

const sanitizeInput = (propertyName) => {
  return propertyName.replace(/[0-9]/g, "");
};

const preparePropertyName = (propertyName) => {
  return cssStyleToJsxStyle(sanitizeInput(propertyName));
};

const parseCustomCss = (customCss) => {
  return Object.fromEntries(
    customCss.map((cssLine) => [
      preparePropertyName(cssLine.propertyName),
      cssLine.propertyValue,
    ])
  );
};

export default function App() {
  const [levelNumber, setLevelNumber] = useState(1);
  const [levelData, setLevelData] = useState([]);
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customCss, setCustomCss] = useState([]);
  const [isOverlapping, setIsOverlapping] = useState(false);

  const addCssLine = () => {
    setCustomCss([
      ...customCss,
      {
        id: uid(),
        propertyName: "",
        propertyValue: "",
      },
    ]);
  };

  const updateCss = (id, property, value) => {
    setCustomCss(
      customCss.map((cssLine) =>
        cssLine.id === id ? { ...cssLine, [property]: value } : cssLine
      )
    );
  };

  const deleteCssLine = (id) => {
    setCustomCss(customCss.filter((cssLine) => cssLine.id !== id));
  };

  const readyForNextLevel = () => {
    setIsOverlapping(false);
    setCustomCss([]);
    setLevelNumber(levelNumber + 1);
  };

  useEffect(() => {
    fetch("data/levels.json")
      .then((r) => r.json())
      .then((data) => {
        setLevelData(data["levels"]);
        setMemories(data["memories"]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return;
  }

  const { title, number, avatarStarterCss, avatarLockedCss, goalCss } =
    levelData.find((level) => parseInt(level.number) === levelNumber);

  const avatarCss = {
    ...avatarStarterCss,
    ...parseCustomCss(customCss),
    ...avatarLockedCss,
  };

  return (
    <>
      <MemoryScreen
        memoryText={memories[0]["text"]}
        showMemory={isOverlapping}
        audioSource={memories[0]["file"]}
        nextLevel={levelNumber + (isOverlapping ? 1 : 0)}
        readyForNextLevel={readyForNextLevel}
      />
      <Arena
        goalCss={goalCss}
        avatarCss={avatarCss}
        title={title}
        number={number}
        setIsOverlapping={setIsOverlapping}
      />
      <CssEditor
        lockedCss={avatarLockedCss}
        starterCss={avatarStarterCss}
        customCss={customCss}
        updateCss={updateCss}
        deleteCssLine={deleteCssLine}
        addCssLine={addCssLine}
      />
    </>
  );
}
