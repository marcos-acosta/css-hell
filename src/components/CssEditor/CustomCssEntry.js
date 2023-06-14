import React from "react";
import styles from "./CssEditor.module.css";
import { combineClassNames } from "../../util";

export default function CustomCssEntry(props) {
  return (
    <div className={styles.cssEntry}>
      <button
        className={styles.deleteButton}
        onClick={() => props.deleteCustomCss(props.id)}
      >
        <span
          className={combineClassNames(
            "material-symbols-outlined",
            styles.trashIcon
          )}
        >
          delete
        </span>
      </button>
      <div className={styles.inputContainer}>
        <input
          className={combineClassNames(
            styles.cssInput,
            styles.propertyNameInput,
            props.isWinning && styles.whiteInputUnderline
          )}
          value={props.propertyName}
          onChange={(e) =>
            props.changeCustomCss(props.id, "propertyName", e.target.value)
          }
        />
        :{" "}
        <input
          className={combineClassNames(
            styles.cssInput,
            props.isWinning && styles.whiteInputUnderline
          )}
          value={props.propertyValue}
          onChange={(e) =>
            props.changeCustomCss(props.id, "propertyValue", e.target.value)
          }
        />
        ;
      </div>
    </div>
  );
}
