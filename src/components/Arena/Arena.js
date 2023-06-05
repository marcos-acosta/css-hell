import { useState } from 'react';
import styles from './Arena.module.css'
import CssReceiver from '../CssReceiver/CssReceiver';
import { doBboxesOverlap } from '../../util';

export default function Arena() {
  const [left, setLeft] = useState(10);
  const [avatarBbox, setAvatarBbox] = useState(null);
  const [goalBbox, setGoalBbox] = useState(null);

  if (doBboxesOverlap(avatarBbox, goalBbox)) {
    console.log("Overlap!");
  }

  const avatarBaseStyle = {
    "backgroundColor": "rgb(120, 221, 171)",
    "boxShadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    "width": "5vw",
    "height": "5vw",
    "position": "absolute",
    "top": "10vw",
    "left": "10vw"
  };

  const goalBaseStyle = {
    "backgroundColor": "rgb(237, 237, 237)",
    "boxShadow": "inset 0 3px 10px rgba(0, 0, 0, 0.24)",
    "width": "5vw",
    "height": "5vw",
    "position": "absolute",
    "top": "12vw",
    "left": "20vw"
  }

  // console.log(avatarBbox ? `TOP LEFT: left=${avatarBbox.tl.left} top=${avatarBbox.tl.top}` : 'no bbox yet');

  return (
    <>
      <input value={left} onChange={e => setLeft(e.target.value)} />
      <div className={styles.arena}>
        <CssReceiver baseCss={goalBaseStyle} css={{}} setCornerCenter={setGoalBbox} />
        <CssReceiver baseCss={avatarBaseStyle} css={{left: `${left}vw`}} setCornerCenter={setAvatarBbox} />
      </div>
    </>
  );
}
