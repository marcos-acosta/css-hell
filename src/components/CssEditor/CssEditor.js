import React from "react";
import styles from "./CssEditor.module.css";
import Draggable from "react-draggable";
import { interpretId, ELEMENT_TYPE } from "../../util";
import CustomCssEntry from "./CustomCssEntry";

const ELEMENT_TYPE_TO_NAME = {
  [ELEMENT_TYPE.peg]: "PEG",
  [ELEMENT_TYPE.hole]: "HOLE",
  [ELEMENT_TYPE.div]: "DIV",
};

const convertIdToTitle = (id) => {
  const { elementType, letter, index } = interpretId(id);
  const displayName = letter ? letter : index + 1;
  return `${ELEMENT_TYPE_TO_NAME[elementType]} ${displayName}`;
};

const jsxPropertyToCssProperty = (propertyName) => {
  return propertyName.replace(/(\w)([A-Z])/, "$1-$2").toLowerCase();
};

export default function CssEditor(props) {
  if (!props.selectedElementInfo) {
    return;
  }

  const { cssBudget, id, style } = props.selectedElementInfo;
  const customCss = id in props.customCss ? props.customCss[id] : [];

  const addCustomCss = (cssBudget) => {
    if (customCss.length >= cssBudget) {
      return;
    }
    props.addCustomCss(id);
  };

  const changeCustomCss = (styleId, propertyName, value) =>
    props.changeCustomCss(id, styleId, propertyName, value);

  const deleteCustomCss = (styleId) => props.deleteCustomCss(id, styleId);

  return (
    <Draggable>
      <div className={styles.cssEditorContainer}>
        <div className={styles.title}>
          <span className={styles.titleText}>{convertIdToTitle(id)}</span>{" "}
          <span className={styles.cssAllowance}>
            {!cssBudget ? (
              <span>[locked]</span>
            ) : (
              <span>
                [{customCss.length}/{cssBudget}]
              </span>
            )}
          </span>
        </div>
        <div className={styles.existingCssList}>
          {Object.entries(style).map(([propertyName, propertyValue]) => (
            <div key={propertyName} className={styles.cssEntry}>
              <span className={styles.propertyName}>
                {jsxPropertyToCssProperty(propertyName)}
              </span>
              : <span className={styles.propertyValue}>{propertyValue}</span>;
            </div>
          ))}
        </div>
        <hr />
        <div className={styles.customCssContainer}>
          {customCss.length ? (
            customCss.map((cssElement) => (
              <CustomCssEntry
                key={cssElement.styleId}
                propertyName={cssElement.propertyName}
                propertyValue={cssElement.propertyValue}
                id={cssElement.styleId}
                changeCustomCss={changeCustomCss}
                deleteCustomCss={deleteCustomCss}
              />
            ))
          ) : (
            <span className={styles.noCustomCss}>no css</span>
          )}
        </div>
        <button
          className={styles.addCssButton}
          onClick={() => addCustomCss(cssBudget)}
        >
          [add css]
        </button>
      </div>
    </Draggable>
  );
}
