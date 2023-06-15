import React from "react";
import styles from "./LevelButton.module.css";

export default function LevelButton(props) {
  return (
    <button
      onClick={() =>
        props.isUnlocked && props.setSelectedLevel(parseInt(props.levelNumber))
      }
      disabled={!props.isUnlocked}
      className={styles.levelButton}
    >
      #{props.levelNumber} {props.isUnlocked ? props.levelName : "???"}
    </button>
  );
}
