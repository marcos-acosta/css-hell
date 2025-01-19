import React from "react";
import styles from "./LevelButton.module.css";
import { combineClassNames } from "../../../util";

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
      {props.showMessage && (
        <div
          role="button"
          className={styles.messageButton}
          onClick={() => props.showMessageByLevelNumber(props.levelNumber)}
        >
          <span
            className={combineClassNames(
              "material-symbols-outlined",
              styles.noteSymbol
            )}
          >
            sticky_note_2
          </span>
        </div>
      )}
    </button>
  );
}
