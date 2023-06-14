import React from "react";
import styles from "./CssEditor.module.css";

export default function CustomCssEntry(props) {
  return (
    <div>
      <button
        className={styles.deleteButton}
        onClick={() => props.deleteCustomCss(props.id)}
      >
        [d]
      </button>
      <input
        className={styles.cssInput}
        value={props.propertyName}
        onChange={(e) =>
          props.changeCustomCss(props.id, "propertyName", e.target.value)
        }
      />
      <input
        className={styles.cssInput}
        value={props.propertyValue}
        onChange={(e) =>
          props.changeCustomCss(props.id, "propertyValue", e.target.value)
        }
      />
    </div>
  );
}
