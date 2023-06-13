import React from "react";

export default function LevelButton(props) {
  return (
    <button
      onClick={() =>
        props.isUnlocked && props.setSelectedLevel(props.levelNumber)
      }
    >
      {props.levelNumber}. ({props.isUnlocked ? props.levelName : "???"})
    </button>
  );
}
