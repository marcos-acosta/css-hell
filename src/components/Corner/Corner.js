import React, { useEffect, useRef } from 'react'
import styles from './Corner.module.css'
import { combineClassNames } from '../../util';

export default function Corner(props) {
  const ref = useRef();
  const isTop = props.corner[0] === "t";
  const isLeft = props.corner[1] === "l";
  const eventsToListenFor = ["scroll", "resize"];

  const getCornerCenter = () => {
    if (!ref.current) {
      return null;
    }
    const { left, top, right, bottom } = ref.current.getBoundingClientRect();
    return {
      left: left + (right - left) / 2,
      top: top + (bottom - top) / 2
    }
  }

  const reportCornerCenterFn = () => props.setCornerCenter(getCornerCenter())

  useEffect(() => {
    if (ref.current) {
      props.setCornerCenter(getCornerCenter(ref));
      eventsToListenFor.forEach(eventName => window.addEventListener(eventName, reportCornerCenterFn));
    }
    return () => {
      eventsToListenFor.forEach(eventName => window.removeEventListener(eventName, reportCornerCenterFn));
    };
  }, [props, ref]);

  return (
    <div ref={ref} className={combineClassNames(styles.corner,
                                                isTop ? styles.top : styles.bottom,
                                                isLeft ? styles.left : styles.right)} />
  )
};
