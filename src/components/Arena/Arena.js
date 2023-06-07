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

  const fullAvatarCss = {
    ...props.customCss,
    ...props.avatarStarterCss,
  };

  return (
    <>
      <div className={styles.arena}>
        <CssReceiver
          css={props.goalCss}
          setCornerCenter={setGoalBbox}
          character="B"
        />
        <CssReceiver
          css={fullAvatarCss}
          setCornerCenter={setAvatarBbox}
          character="A"
        />
      </div>
    </>
  );
}
