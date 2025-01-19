import React from "react";
import styles from "./LevelHeader.module.css";
import { combineClassNames } from "../../util";

export default function LevelHeader(props) {
  return (
    <div className={styles.gameControlsContainer}>
      <div
        className={combineClassNames(
          styles.levelTitle,
          props.isWinning && styles.whiteText
        )}
      >
        {props.levelNumber !== 9 && (
          <>
            #{props.levelNumber} {props.levelName}
          </>
        )}
      </div>
      <div className={styles.floatRightControls}>
        <button
          className={combineClassNames(
            styles.gameControlButton,
            props.isWinning && styles.whiteButton,
            props.isShowingHint && styles.gameControlButtonSelected
          )}
          onClick={props.toggleShowHint}
        >
          <span
            className={combineClassNames(
              "material-symbols-outlined",
              styles.gameControlSymbol
            )}
          >
            question_mark
          </span>
        </button>
        <button
          className={combineClassNames(
            styles.gameControlButton,
            props.isWinning && styles.whiteButton
          )}
          onClick={props.resetLevel}
        >
          <span
            className={combineClassNames(
              "material-symbols-outlined",
              styles.gameControlSymbol
            )}
          >
            undo
          </span>
        </button>
        <button
          className={combineClassNames(
            styles.gameControlButton,
            props.isWinning && styles.whiteButton
          )}
          onClick={props.goHome}
        >
          <span
            className={combineClassNames(
              "material-symbols-outlined",
              styles.gameControlSymbol
            )}
          >
            logout
          </span>
        </button>
      </div>
    </div>
  );
}
