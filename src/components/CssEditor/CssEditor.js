import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import Draggable from "react-draggable";
import styles from "./CssEditor.module.css";
import { combineClassNames } from "../../util";
import CustomCssLine from "../CustomCssLine/CustomCssLine";
import { uid } from "uid/secure";

const jsxStyleToCssStyle = (propertyName) => {
  return propertyName.replace(/(\w)([A-Z])/, "$1-$2").toLowerCase();
};

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/, (x) => x.slice(1).toUpperCase());
};

export default function CssEditor(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
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
          {customCss.map((cssItem) => (
            <CustomCssLine
              {...cssItem}
              key={cssItem.id}
              deleteCssLine={deleteCssLine}
              updateCss={updateCss}
            />
          ))}
          {!customCss.length && (
            <div className={styles.noStylesMessage}>no styles added</div>
          )}
          <hr />
          <button className={styles.addNewLineButton} onClick={addCssLine}>
            + add new property
          </button>
        </div>
      </div>
    </Draggable>
  );
}
