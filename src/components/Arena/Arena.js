import { useState } from "react";
import styles from "./Arena.module.css";
import CssReceiver from "../CssReceiver/CssReceiver";
import { doBboxesOverlap } from "../../util";

export default function Arena(props) {
  const [avatarBbox, setAvatarBbox] = useState(null);
  const [goalBbox, setGoalBbox] = useState(null);

  if (doBboxesOverlap(avatarBbox, goalBbox)) {
    alert("Overlap!");
  }

  return (
    <>
      <div className={styles.title}>
        {props.number}. {props.title}
      </div>
      <div className={styles.arena}>
        <CssReceiver
          css={props.goalCss}
          setCornerCenter={setGoalBbox}
          character="B"
        />
        <CssReceiver
          css={props.avatarCss}
          setCornerCenter={setAvatarBbox}
          character="A"
        />
      </div>
    </>
  );
}
