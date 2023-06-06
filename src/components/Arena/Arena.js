import { useState } from 'react';
import styles from './Arena.module.css'
import CssReceiver from '../CssReceiver/CssReceiver';
import { doBboxesOverlap } from '../../util';

export default function Arena() {
  const [left, setLeft] = useState(0);
  const [avatarBbox, setAvatarBbox] = useState(null);
  const [goalBbox, setGoalBbox] = useState(null);

  const customCss = {
    left: `${left}vw`
  }

  if (doBboxesOverlap(avatarBbox, goalBbox)) {
    console.log("Overlap!");
  }

  const avatarBaseCss = {
    backgroundColor: "rgb(37, 37, 37)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 7px 12px",
    width: "5vw",
    height: "5vw",
    position: "absolute",
  };

  const goalBaseCss = {
    backgroundColor: "rgb(237, 237, 237)",
    boxShadow: "inset 0 7px 12px rgba(0, 0, 0, 0.24)",
    width: "5vw",
    height: "5vw",
    position: "absolute",
    top: "12vw",
    left: "20vw"
  }

  const combinedCss = {
    ...customCss,
    ...avatarBaseCss
  }

  // console.log(avatarBbox ? `TOP LEFT: left=${avatarBbox.tl.left} top=${avatarBbox.tl.top}` : 'no bbox yet');

  return (
    <>
      <input value={left} onChange={e => setLeft(e.target.value)} />
      <div className={styles.arena}>
        <CssReceiver css={goalBaseCss} setCornerCenter={setGoalBbox} />
        <CssReceiver css={combinedCss} setCornerCenter={setAvatarBbox} />
      </div>
    </>
  );
}
