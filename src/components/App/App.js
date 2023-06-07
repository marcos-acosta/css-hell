import React, { useEffect, useState } from "react";
import Arena from "../Arena/Arena";
import CssEditor from "../CssEditor/CssEditor";
import { uid } from "uid/secure";

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/, (x) => x.slice(1).toUpperCase());
};

const parseCustomCss = (customCss) => {
  return Object.fromEntries(
    customCss.map((cssLine) => [
      cssStyleToJsxStyle(cssLine.propertyName),
      cssLine.propertyValue,
    ])
  );
};

export default function App() {
  const levelNumber = useState(1)[0];
  const [levelData, setLevelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customCss, setCustomCss] = useState([]);

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

  useEffect(() => {
    fetch("data/levels.json")
      .then((r) => r.json())
      .then((data) => {
        setLevelData(data["levels"]);
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
      <Arena
        goalCss={goalCss}
        avatarCss={avatarCss}
        title={title}
        number={number}
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
