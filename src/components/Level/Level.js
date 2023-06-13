import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Level.module.css";
import Controllable from "../Controllable/Controllable";
import { combineClassNames, doCirclesIntersect } from "../../util";

const divA = {
  position: "absolute",
  height: "10vw",
  width: "5vw",
  top: "calc((100vh - 10vw - 2vw) / 2)",
  left: "calc(100vw / 3)",
  border: "1vw solid #176bef",
  cursor: "pointer",
};

const blockA = {
  position: "static",
  height: "5vw",
  width: "5vw",
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ff3e30",
  fontSize: "2vw",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "50%",
};

const blockB = {
  position: "static",
  height: "5vw",
  width: "5vw",
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f7b529",
  fontSize: "2vw",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "50%",
};

const goalA = {
  position: "absolute",
  right: "calc(100vw / 3)",
  top: "calc((100vh - 10vw) / 2)",
  height: "4.5vw",
  width: "4.5vw",
  color: "#ff3e30",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "0.25vw dashed #ff3e30",
  fontSize: "2vw",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "50%",
  backgroundColor: "rgb(255,255,255,0.5)",
};

const goalB = {
  position: "absolute",
  right: "calc((100vw / 3) + 11vw)",
  top: "calc((100vh - 10vw) / 2 + 5vw)",
  height: "4.5vw",
  width: "4.5vw",
  color: "#f7b529",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "0.25vw dashed #f7b529",
  fontSize: "2vw",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "50%",
  backgroundColor: "rgb(255,255,255,0.5)",
};

const RESIZE_EVENTS = ["scroll", "resize"];

const isWinningConfiguration = (ref2, ref4) => {
  return (
    ref2.current &&
    ref4.current &&
    doCirclesIntersect(
      ref2.current.getBoundingClientRect(),
      ref4.current.getBoundingClientRect()
    )
  );
};

export default function Level(props) {
  const [marginLeft, setMarginLeft] = useState(0);
  const [isWinning, setIsWinning] = useState(false);
  const triggerRerender = useState(false)[1];
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref2bb = ref2.current && ref2.current.getBoundingClientRect();
  const ref4bb = ref2.current && ref4.current.getBoundingClientRect();

  console.log("rerender");

  useEffect(() => {
    setIsWinning(isWinningConfiguration(ref2, ref4));
  }, [ref2bb, ref4bb]);

  const marginLeftStyle = { marginLeft: `${marginLeft}vw` };
  const flipMacguffin = useCallback(
    () => triggerRerender((r) => !r),
    [triggerRerender]
  );

  useEffect(() => {
    RESIZE_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, flipMacguffin)
    );
    return () => {
      RESIZE_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, flipMacguffin)
      );
    };
  }, [flipMacguffin]);

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
        <Controllable
          isTarget={false}
          styles={{ ...divA, ...marginLeftStyle }}
          reportBbox={() => {}}
          ref={ref1}
        >
          <Controllable
            isTarget={true}
            matchingId={0}
            styles={blockA}
            reportBbox={() => {}}
            ref={ref2}
          />
          <Controllable
            isTarget={true}
            matchingId={1}
            styles={blockB}
            reportBbox={() => {}}
            ref={ref3}
          />
        </Controllable>
        <Controllable
          isTarget={true}
          matchingId={0}
          styles={goalA}
          reportBbox={() => {}}
          ref={ref4}
        />
        <Controllable
          isTarget={true}
          matchingId={1}
          styles={goalB}
          reportBbox={() => {}}
          ref={ref5}
        />
      </div>
      <div className={styles.gameControlsContainer}>
        <div className={styles.levelTitle}>
          <span className={styles.levelNumber}>#{props.levelNumber}</span>{" "}
          {props.levelData.levelName}
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
