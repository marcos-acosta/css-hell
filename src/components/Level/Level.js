import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Level.module.css";
import Controllable from "../Controllable/Controllable";
import CssEditor from "../CssEditor/CssEditor";
import LevelHeader from "../LevelHeader/LevelHeader";
import {
  NERFED_PROPERTIES,
  combineClassNames,
  getIndexFromId,
  interpretId,
  isHole,
  testForOverlapRandom,
} from "../../util";
import { uid } from "uid/secure";

const cssStyleToJsxStyle = (propertyName) => {
  return propertyName.replace(/-\w/, (x) => x.slice(1).toUpperCase());
};

const sanitizePropertyName = (propertyName) => {
  return propertyName.replace(/[0-9-]/g, "");
};

const preparePropertyName = (propertyName) => {
  return sanitizePropertyName(cssStyleToJsxStyle(propertyName));
};

const preparePropertyValue = (propertyValue) => {
  return propertyValue.replace(/;/g, "");
};

const parseCustomCss = (customCss) => {
  return customCss
    ? Object.fromEntries(
        customCss
          .map((cssLine) =>
            NERFED_PROPERTIES.includes(
              preparePropertyName(cssLine.propertyName)
            )
              ? []
              : [
                  preparePropertyName(cssLine.propertyName),
                  preparePropertyValue(cssLine.propertyValue),
                ]
          )
          .filter((kvPair) => kvPair.length)
      )
    : {};
};

const formatNerfedPropertyNames = () => {
  return NERFED_PROPERTIES.map((propertyName, i) => (
    <span key={i}>
      {i === 0 ? "" : i === NERFED_PROPERTIES.length - 1 ? ", and " : ", "}
      <span className={styles.nerfedPropertyName}>{propertyName}</span>
    </span>
  ));
};

const RESIZE_EVENTS = ["scroll", "resize"];
const FORMATTED_NERFED_PROPERTY_NAMES = formatNerfedPropertyNames();

export default function Level(props) {
  const [selectedElementInfo, setSelectedElementInfo] = useState(null);
  const [isWinning, setIsWinning] = useState(false);
  const [customCss, setCustomCss] = useState({});
  const [showNerfMessage, setShowNerfMessage] = useState(false);
  const setRerenderState = useState(false)[1];
  const elementRefs = useRef([]);

  const elementsShallowCopy = elementRefs.current.map((x) => x);
  const { clearThisLevel } = props;

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
        ...parseCustomCss(customCss[id]),
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

  useEffect(() => {
    const areAllOverlapping = elementRefs.current
      .map((element) => testForOverlapRandom(element))
      .every(Boolean);
    setIsWinning(areAllOverlapping);
    if (areAllOverlapping) {
      clearThisLevel();
    }
  }, [elementsShallowCopy, clearThisLevel]);

  useEffect(() => {
    setCustomCss({});
    setSelectedElementInfo(null);
  }, [props.levelData]);

  useEffect(() => {
    for (const customCssEntries of Object.values(customCss)) {
      for (const cssEntry of customCssEntries) {
        if (NERFED_PROPERTIES.includes(cssEntry.propertyName)) {
          setShowNerfMessage(true);
          return;
        }
      }
    }
    setShowNerfMessage(false);
  }, [customCss]);

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

  return (
    <>
      <div
        className={combineClassNames(
          styles.levelContainer,
          isWinning && styles.devWinCondition
        )}
      >
        {buildElements(
          props.levelData.elements,
          props.levelData.elementData,
          customCss,
          elementRefs
        )}
      </div>
      {isWinning && (
        <button
          className={styles.nextLevelButton}
          onClick={props.handleNextButton}
        >
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
        levelNumber={props.levelNumber}
        levelName={props.levelData.levelName}
        goHome={props.goHome}
        resetLevel={props.reset}
        isWinning={isWinning}
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
      {showNerfMessage && (
        <div className={styles.nerfMessage}>
          Nice thinking. Unfortuantely for you,{" "}
          {FORMATTED_NERFED_PROPERTY_NAMES} are forbidden.
        </div>
      )}
    </>
  );
}
