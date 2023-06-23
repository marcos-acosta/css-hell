import React from "react";
import styles from "./CssEditor.module.css";
import Draggable from "react-draggable";
import {
  interpretId,
  ELEMENT_TYPE,
  combineClassNames,
  jsxPropertyToCssProperty,
  NERFED_PROPERTIES,
  doesPropertyNameConflictWithStyles,
} from "../../util";
import CustomCssEntry from "./CustomCssEntry";

const ELEMENT_TYPE_TO_NAME = {
  [ELEMENT_TYPE.peg]: "PEG",
  [ELEMENT_TYPE.hole]: "HOLE",
  [ELEMENT_TYPE.div]: "DIV",
  [ELEMENT_TYPE.text]: "TEXT",
};

const convertIdToTitle = (id) => {
  const { elementType, letter, index } = interpretId(id);
  const displayName = letter ? letter : index + 1;
  return `${ELEMENT_TYPE_TO_NAME[elementType]} ${displayName}`;
};

export default function CssEditor(props) {
  if (!props.selectedElementInfo) {
    return;
  }

  const { id, style } = props.selectedElementInfo;
  const cssBudget = props.selectedElementInfo.cssBudget || 0;
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
      <div
        className={combineClassNames(
          styles.cssEditorContainer,
          props.isWinning && styles.isWinning
        )}
      >
        <div className={styles.titleContainer}>
          <button
            className={combineClassNames(
              styles.closeButton,
              props.isWinning && styles.whiteBorder
            )}
            onClick={props.closeCssEditor}
          >
            <span
              className={combineClassNames(
                "material-symbols-outlined",
                styles.closeSymbol
              )}
            >
              close
            </span>
          </button>
          <span className={styles.titleText}>{convertIdToTitle(id)}</span>
          <span className={styles.cssAllowance}>
            {!cssBudget ? (
              <span
                className={combineClassNames(
                  "material-symbols-outlined",
                  styles.lockSymbol
                )}
              >
                lock
              </span>
            ) : (
              <span>
                [{customCss.length}/{cssBudget}]
              </span>
            )}
          </span>
        </div>
        <div className={styles.defaultCssContainer}>
          {Object.entries(style).map(([propertyName, propertyValue]) => (
            <div key={propertyName}>
              <span className={styles.propertyName}>
                {jsxPropertyToCssProperty(propertyName)}
              </span>
              : <span>{propertyValue}</span>;
            </div>
          ))}
        </div>
        <div className={styles.customCssContainer}>
          {customCss.length ? (
            customCss.map((cssElement) => {
              const error =
                NERFED_PROPERTIES.includes(cssElement.propertyName) ||
                doesPropertyNameConflictWithStyles(
                  cssElement.propertyName,
                  style
                );
              return (
                <CustomCssEntry
                  key={cssElement.styleId}
                  propertyName={cssElement.propertyName}
                  propertyValue={cssElement.propertyValue}
                  id={cssElement.styleId}
                  changeCustomCss={changeCustomCss}
                  deleteCustomCss={deleteCustomCss}
                  isWinning={props.isWinning}
                  error={error}
                />
              );
            })
          ) : (
            <div className={styles.noCustomCss}>no added css</div>
          )}
        </div>
        <button
          className={combineClassNames(
            styles.addCssButton,
            props.isWinning && styles.whiteText
          )}
          onClick={() => addCustomCss(cssBudget)}
          disabled={customCss.length >= cssBudget}
        >
          add css
        </button>
      </div>
    </Draggable>
  );
}
