import React from "react";
import styles from "./CustomCssLine.module.css";

export default function CustomCssLine(props) {
  return (
    <div className={styles.cssInputRow}>
      <button
        className={styles.trashIconButton}
        onClick={() => props.deleteCssLine(props.id)}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
      <div className={styles.inputContainer}>
        <input
          value={props.propertyName}
          onChange={(e) =>
            props.updateCss(props.id, "propertyName", e.target.value)
          }
          className={styles.cssInputField}
        />
        :{" "}
        <input
          value={props.propertyValue}
          onChange={(e) =>
            props.updateCss(props.id, "propertyValue", e.target.value)
          }
          className={styles.cssInputField}
        />
        ;
      </div>
    </div>
  );
}
