import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import Draggable from "react-draggable";
import styles from "./CssEditor.module.css";
import { combineClassNames } from "../../util";
import CustomCssLine from "../CustomCssLine/CustomCssLine";

const jsxStyleToCssStyle = (propertyName) => {
  return propertyName.replace(/(\w)([A-Z])/, "$1-$2").toLowerCase();
};

export default function CssEditor(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <Draggable>
      <div className={styles.cssEditorContainer}>
        <div className={styles.titleText}>.css</div>
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
            {isExpanded ? "hide base styles" : "show base styles"}
          </div>
        </button>
        <div {...getCollapseProps()} className={styles.defaultStyleContainer}>
          {Object.entries(props.baseCss).map(([key, value]) => (
            <div key={key}>
              <span
                className={combineClassNames(
                  "material-symbols-outlined",
                  styles.lockSymbol
                )}
              >
                lock
              </span>
              <b>{jsxStyleToCssStyle(key)}</b>: {value};
            </div>
          ))}
        </div>
        <hr />
        <div className={styles.customCssContainer}>
          {props.customCss.map((cssItem) => (
            <CustomCssLine
              {...cssItem}
              key={cssItem.id}
              deleteCssLine={props.deleteCssLine}
              updateCss={props.updateCss}
            />
          ))}
          {!props.customCss.length && (
            <div className={styles.noStylesMessage}>no styles added</div>
          )}
          <hr />
          <button
            className={styles.addNewLineButton}
            onClick={props.addCssLine}
          >
            + add new property
          </button>
        </div>
      </div>
    </Draggable>
  );
}
