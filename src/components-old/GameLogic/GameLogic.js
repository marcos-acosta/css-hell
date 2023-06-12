import React, { useEffect, useState } from "react";
import Arena from "../Arena/Arena";
import CssEditor from "../CssEditor/CssEditor";
import { uid } from "uid/secure";
import MemoryScreen from "../MemoryScreen/MemoryScreen";

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/g, (x) => x.slice(1).toUpperCase());
};

const sanitizePropertyName = (propertyName) => {
  return propertyName.replace(/[0-9]/g, "");
};

const preparePropertyName = (propertyName) => {
  return cssStyleToJsxStyle(sanitizePropertyName(propertyName));
};

const preparePropertyValue = (propertyValue) => {
  return propertyValue.replace(/;/g, "");
};

const parseCustomCss = (customCss) => {
  return Object.fromEntries(
    customCss.map((cssLine) => [
      preparePropertyName(cssLine.propertyName),
      preparePropertyValue(cssLine.propertyValue),
    ])
  );
};

export default function GameLogic(props) {
  const [levelNumber, setLevelNumber] = useState(props.initLevelNumber || 1);
  const [levelData, setLevelData] = useState({});
  const [memories, setMemories] = useState({});
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
    props.saveLevelCheckpoint(levelNumber + 1);
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

  const { title, avatarStarterCss, avatarLockedCss, goalCss } =
    levelData[levelNumber];

  const avatarCss = {
    ...avatarStarterCss,
    ...parseCustomCss(customCss),
    ...avatarLockedCss,
  };

  const previousLevel = Math.max(levelNumber - (isOverlapping ? 0 : 1), 1);

  return (
    <>
      <MemoryScreen
        memoryText={memories[previousLevel]["text"]}
        showMemory={isOverlapping}
        audioSource={memories[previousLevel]["file"]}
        nextLevel={previousLevel + 1}
        readyForNextLevel={readyForNextLevel}
      />
      <Arena
        goalCss={goalCss}
        avatarCss={avatarCss}
        title={title}
        number={levelNumber}
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
