import React, { useEffect, useRef } from 'react'
import styles from './Edgepoint.module.css'
import { combineClassNames } from '../../util';

export default function Edgepoint(props) {
  const ref = useRef();
  const isTop = props.corner[0] === "t";
  const isLeft = props.corner[1] === "l";

  const getCornerCenter = (ref) => {
    if (!ref.current) {
      return null;
    }
    const { left, top, right, bottom } = ref.current.getBoundingClientRect();
    return {
      left: left + (right - left) / 2,
      top: top + (bottom - top) / 2
    }
  }

  useEffect(() => {
    if (ref.current) {
      props.setCornerCenter(getCornerCenter(ref));
      window.addEventListener("scroll", () => props.setCornerCenter(getCornerCenter(ref)));
      window.addEventListener("resize", () => props.setCornerCenter(getCornerCenter(ref)));
    }
  }, [props, ref]);

  return (
    <div ref={ref} className={combineClassNames(styles.edgepoint,
                                                isTop ? styles.top : styles.bottom,
                                                isLeft ? styles.left : styles.right)} />
  )
};
