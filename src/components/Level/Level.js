import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Level.module.css";
import Controllable from "../Controllable/Controllable";
import CssEditor from "../CssEditor/CssEditor";
import LevelHeader from "../LevelHeader/LevelHeader";
import {
  LAST_LEVEL_NUMBER,
  NERFED_PROPERTIES,
  combineClassNames,
  filterConflictingProperties,
  filterNerfedProperties,
  getIndexFromId,
  interpretId,
  isHole,
  preparePropertyName,
  preparePropertyValue,
  testForOverlapRandom,
} from "../../util";
import { uid } from "uid/secure";

const parseCustomCss = (customCss) => {
  return customCss
    ? Object.fromEntries(
        customCss
          .map((cssLine) => [
            preparePropertyName(cssLine.propertyName),
            preparePropertyValue(cssLine.propertyValue),
          ])
          .filter((kvPair) => kvPair.length)
      )
    : {};
};

const parseAllCustomCss = (customCss) => {
  return Object.fromEntries(
    Object.entries(customCss).map(([elementId, cssData]) => [
      elementId,
      parseCustomCss(cssData),
    ])
  );
};

const combineStylesById = (elementStyles1, elementStyles2) => {
  const idsUnion = [
    ...new Set([
      ...Object.keys(elementStyles1),
      ...Object.keys(elementStyles2),
    ]),
  ];
  return Object.fromEntries(
    idsUnion.map((id) => [id, { ...elementStyles1[id], ...elementStyles2[id] }])
  );
};

const getBaseStylesById = (ids) => {
  return Object.fromEntries(ids.map((id) => [id, interpretId(id).baseStyles]));
};

const extractStylesFromElementData = (elementData) => {
  return Object.fromEntries(
    Object.entries(elementData).map(([id, data]) => [id, data.style])
  );
};

const formatNerfedPropertyNames = () => {
  return NERFED_PROPERTIES.map((propertyName, i) => (
    <span key={i}>
      {i === 0 ? "" : i === NERFED_PROPERTIES.length - 1 ? ", and " : ", "}
      <span className={styles.grayText}>{propertyName}</span>
    </span>
  ));
};

const RESIZE_EVENTS = ["scroll", "resize"];
const FORMATTED_NERFED_PROPERTY_NAMES = formatNerfedPropertyNames();

export default function Level(props) {
  const [selectedElementInfo, setSelectedElementInfo] = useState(null);
  const [isWinning, setIsWinning] = useState(false);
  const [customCss, setCustomCss] = useState({});
  const [showHint, setShowHint] = useState(false);
  const setRerenderState = useState(false)[1];
  const elementRefs = useRef([]);

  const elementsShallowCopy = elementRefs.current.map((x) => x);
  const { clearThisLevel, handleNextButton, levelNumber } = props;

  const buildElements = (elements, elementData, customCss, elementRefs) => {
    if (!elements) {
      return <></>;
    } else if (Array.isArray(elements)) {
      return (
        <>
          {elements.map((element) =>
            buildElements(element, elementData, customCss, elementRefs)
          )}
        </>
      );
    } else {
      const element = elements;
      const { id, children } = element;
      const { style, text } = elementData[id];
      const { baseStyles } = interpretId(id);
      const elementStyles = { ...baseStyles, ...style };
      const combinedCss = {
        ...customCss[id],
        ...elementStyles,
      };
      const completeElementData = {
        ...elementData[id],
        style: elementStyles,
        id: id,
      };
      const ref = isHole(id)
        ? (el) => (elementRefs.current[getIndexFromId(id)] = el)
        : null;
      return (
        <Controllable
          key={id}
          id={id}
          styles={combinedCss}
          ref={ref}
          text={text}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElementInfo(completeElementData);
          }}
        >
          {buildElements(children, elementData, customCss, elementRefs)}
        </Controllable>
      );
    }
  };

  const triggerRerender = useCallback(
    () => setRerenderState((r) => !r),
    [setRerenderState]
  );

  const addCustomCss = (id) => {
    if (isWinning) {
      return;
    }
    const newCssElement = {
      styleId: uid(),
      propertyName: "",
      propertyValue: "",
    };
    if (id in customCss) {
      setCustomCss({ ...customCss, [id]: [...customCss[id], newCssElement] });
    } else {
      setCustomCss({ ...customCss, [id]: [newCssElement] });
    }
  };

  const deleteCustomCss = (id, styleId) => {
    if (isWinning) {
      return;
    }
    setCustomCss({
      ...customCss,
      [id]: customCss[id].filter((cssEntry) => cssEntry.styleId !== styleId),
    });
  };

  const changeCustomCss = (id, styleId, property, value) => {
    if (isWinning) {
      return;
    }
    setCustomCss({
      ...customCss,
      [id]: customCss[id].map((cssEntry) =>
        cssEntry.styleId === styleId
          ? { ...cssEntry, [property]: value }
          : cssEntry
      ),
    });
  };

  const cleanCustomCss = (parsedCss, elementData) => {
    let anyNerfed = false;
    let anyConflicting = false;
    const cleanedStyles = {};
    for (const id in parsedCss) {
      const parsedCssForId = id in parsedCss ? parsedCss[id] : {};
      const [noNerfedStyles, wasNerfedStyles] =
        filterNerfedProperties(parsedCssForId);
      const [noConflictingStyles, wasConflictingStyles] =
        filterConflictingProperties(noNerfedStyles, elementData[id]);
      if (wasNerfedStyles) {
        anyNerfed = true;
      }
      if (wasConflictingStyles) {
        anyConflicting = true;
      }
      cleanedStyles[id] = noConflictingStyles;
    }
    return [cleanedStyles, anyNerfed, anyConflicting];
  };

  useEffect(() => {
    const areAllOverlapping = elementRefs.current
      .map((element) => testForOverlapRandom(element))
      .every(Boolean);
    setIsWinning(areAllOverlapping);
    if (areAllOverlapping) {
      clearThisLevel();
      if (levelNumber === LAST_LEVEL_NUMBER) {
        handleNextButton();
      }
    }
  }, [elementsShallowCopy, clearThisLevel, levelNumber, handleNextButton]);

  useEffect(() => {
    setCustomCss({});
    setSelectedElementInfo(null);
    setShowHint(false);
  }, [props.levelData]);

  useEffect(() => {
    RESIZE_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, triggerRerender)
    );
    return () => {
      RESIZE_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, triggerRerender)
      );
    };
  }, [triggerRerender]);

  const ids = Object.keys(props.levelData.elementData);
  const parsedCustomCss = parseAllCustomCss(customCss);
  const baseStyles = getBaseStylesById(ids);
  const levelStyles = extractStylesFromElementData(props.levelData.elementData);
  const presetStyles = combineStylesById(baseStyles, levelStyles);
  const [cleanedCustomCss, anyNerfed, anyConflicting] = cleanCustomCss(
    parsedCustomCss,
    presetStyles
  );

  return (
    <>
      <div
        className={combineClassNames(
          styles.levelContainer,
          isWinning && styles.devWinCondition,
          levelNumber === LAST_LEVEL_NUMBER && styles.darkerGradient
        )}
      >
        {buildElements(
          props.levelData.elements,
          props.levelData.elementData,
          cleanedCustomCss,
          elementRefs
        )}
      </div>
      {isWinning && (
        <button className={styles.nextLevelButton} onClick={handleNextButton}>
          <span
            className={combineClassNames(
              "material-symbols-outlined",
              styles.nextLevelSymbol
            )}
          >
            skip_next
          </span>
        </button>
      )}
      <LevelHeader
        levelNumber={levelNumber}
        levelName={props.levelData.levelName}
        goHome={props.goHome}
        resetLevel={props.reset}
        isWinning={isWinning}
        toggleShowHint={() => setShowHint(!showHint)}
        isShowingHint={showHint}
      />
      <CssEditor
        selectedElementInfo={selectedElementInfo}
        customCss={customCss}
        addCustomCss={addCustomCss}
        deleteCustomCss={deleteCustomCss}
        changeCustomCss={changeCustomCss}
        isWinning={isWinning}
        closeCssEditor={() => setSelectedElementInfo(null)}
      />
      {(anyNerfed || anyConflicting) && (
        <div className={styles.bottomRightPanel}>
          {anyNerfed ? (
            <>
              Nice thinking. Unfortuantely for you,{" "}
              {FORMATTED_NERFED_PROPERTY_NAMES} are forbidden.
            </>
          ) : (
            <>
              It's bad practice to mix shorthand and non-shorthand properties.
              And I don't like bad practice.
            </>
          )}
        </div>
      )}
      {showHint && (
        <div className={styles.bottomLeftPanel}>
          <span className={styles.grayText}>SKILL ISSUE?</span>{" "}
          {props.levelData.hint}
        </div>
      )}
    </>
  );
}
