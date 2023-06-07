import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import Draggable from "react-draggable";
import styles from "./CssEditor.module.css";
import { combineClassNames } from "../../util";

const jsxStyleToCssStyle = (propertyName) => {
  return propertyName.replace(/(\w)([A-Z])/, "$1-$2").toLowerCase();
};

export default function CssEditor(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [customCss, setCustomCss] = useState({});

  return (
    <Draggable>
      <div className={styles.cssEditorContainer}>
        <button
          className={styles.toggleDefaultStyleButton}
          {...getToggleProps()}
        >
          <span
            className={combineClassNames(
              styles.dropDownSymbol,
              "material-symbols-outlined"
            )}
          >
            {isExpanded ? "expand_more" : "chevron_right"}
          </span>
          <div className={styles.toggleDefaultStyleButtonText}>
            {isExpanded ? "hide base css" : "show base css"}
          </div>
        </button>
        <div {...getCollapseProps()} className={styles.defaultStyleContainer}>
          {Object.entries(props.baseCss).map(([key, value]) => (
            <div key={key}>
              <b>{key}</b>: {value};
            </div>
          ))}
        </div>
        <hr />
      </div>
    </Draggable>
  );
}
