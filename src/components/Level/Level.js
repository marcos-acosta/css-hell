import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Level.module.css";
import Controllable from "../Controllable/Controllable";
import { combineClassNames, isHole, testForOverlapRandom } from "../../util";

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
    const combinedCss = { ...style, ...customCss[id] };
    const ref = isHole(id) ? (el) => (elementRefs.current[id] = el) : null;
    return (
      <Controllable key={id} id={id} styles={combinedCss} ref={ref}>
        {buildElements(children, customCss, elementRefs)}
      </Controllable>
    );
  }
};

const RESIZE_EVENTS = ["scroll", "resize"];

export default function Level(props) {
  const [marginLeft, setMarginLeft] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [isWinning, setIsWinning] = useState(false);
  const setRerenderState = useState(false)[1];
  const elementRefs = useRef({});

  const reffedElements = elementRefs && Object.values(elementRefs.current);

  useEffect(() => {
    setIsWinning(
      elementRefs.current &&
        Object.values(elementRefs.current)
          .map((element) => testForOverlapRandom(element))
          .every(Boolean)
    );
  }, [reffedElements]);

  const customCss = {
    d0: { marginLeft: `${marginLeft}vw`, rotate: `${rotate}deg` },
  };

  const triggerRerender = useCallback(
    () => setRerenderState((r) => !r),
    [setRerenderState]
  );

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
        <input
          value={marginLeft}
          onChange={(e) => setMarginLeft(e.target.value)}
        />
        <input value={rotate} onChange={(e) => setRotate(e.target.value)} />
        {buildElements(props.levelData.elements, customCss, elementRefs)}
      </div>
      <div className={styles.gameControlsContainer}>
        <div className={styles.levelTitle}>
          #{props.levelNumber} {props.levelData.levelName}
        </div>
        <div className={styles.floatRightControls}>
          <button className={styles.gameControlButton}>restart</button>
          <button className={styles.gameControlButton} onClick={props.goHome}>
            home
          </button>
        </div>
      </div>
    </>
  );
}
