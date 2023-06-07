import React, { useEffect, useState } from "react";
import Arena from "../Arena/Arena";
import CssEditor from "../CssEditor/CssEditor";
import { uid } from "uid/secure";

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/, (x) => x.slice(1).toUpperCase());
};

const baseBoxCss = {
  fontSize: "3vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  borderRadius: "0.5vw",
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
  const [levelNumber, _] = useState(1);
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

  const { avatarBaseCss, goalCss, title, obstacles } = levelData.find(
    (level) => parseInt(level.number) === levelNumber
  );

  const fullGoalCss = { ...goalCss, ...baseBoxCss };
  const avatarStarterCss = { ...avatarBaseCss, ...baseBoxCss };

  return (
    <>
      <Arena
        goalCss={fullGoalCss}
        avatarStarterCss={avatarStarterCss}
        customCss={parseCustomCss(customCss)}
      />
      <CssEditor
        baseCss={avatarStarterCss}
        customCss={customCss}
        updateCss={updateCss}
        deleteCssLine={deleteCssLine}
        addCssLine={addCssLine}
      />
    </>
  );
}
