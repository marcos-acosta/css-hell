import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Level.module.css";
import Controllable from "../Controllable/Controllable";
import CssEditor from "../CssEditor/CssEditor";
import LevelHeader from "../LevelHeader/LevelHeader";
import {
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
        customCss.map((cssLine) => [
          preparePropertyName(cssLine.propertyName),
          preparePropertyValue(cssLine.propertyValue),
        ])
      )
    : {};
};

const RESIZE_EVENTS = ["scroll", "resize"];

export default function Level(props) {
  const [selectedElementInfo, setSelectedElementInfo] = useState(null);
  const [isWinning, setIsWinning] = useState(false);
  const [customCss, setCustomCss] = useState({});
  const setRerenderState = useState(false)[1];
  const elementRefs = useRef([]);

  const elementsShallowCopy = elementRefs.current.map((x) => x);

  const buildElements = (elementData, customCss, elementRefs) => {
    if (!elementData) {
      return <></>;
    } else if (Array.isArray(elementData)) {
      return (
        <>
          {elementData.map((element) =>
            buildElements(element, customCss, elementRefs)
          )}
        </>
      );
    } else {
      const { id, style, children } = elementData;
      const { baseStyles } = interpretId(id);
      const elementStyles = { ...baseStyles, ...style };
      const combinedCss = {
        ...parseCustomCss(customCss[id]),
        ...elementStyles,
      };
      const completeElementData = {
        ...elementData,
        style: elementStyles,
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
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElementInfo(completeElementData);
          }}
        >
          {buildElements(children, customCss, elementRefs)}
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
    setIsWinning(
      elementRefs.current
        .map((element) => testForOverlapRandom(element))
        .every(Boolean)
    );
  }, [elementsShallowCopy]);

  useEffect(() => {
    setCustomCss({});
    setSelectedElementInfo(null);
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

  return (
    <>
      <div
        className={combineClassNames(
          styles.levelContainer,
          isWinning && styles.devWinCondition
        )}
      >
        {buildElements(props.levelData.elements, customCss, elementRefs)}
      </div>
      {isWinning && (
        <button
          className={styles.nextLevelButton}
          onClick={props.moveToNextLevel}
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
    </>
  );
}
