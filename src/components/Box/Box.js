import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import styles from './Box.module.css'
import Corner from '../Corner/Corner'

export default function Box(props) {
  const ref = useRef(null);
  const eventsToListenFor = useMemo(() => ["scroll", "resize"], []);
  const reportCornerCenter = useCallback(() => {
    if (ref.current) {
      props.setCornerCenter(ref.current.getBoundingClientRect());
    }
  }, [props, ref]);

  useEffect(() => {
    reportCornerCenter();
  });

  useEffect(() => {
    eventsToListenFor.forEach(eventName => window.addEventListener(eventName, reportCornerCenter));
    return () => {
      eventsToListenFor.forEach(eventName => window.removeEventListener(eventName, reportCornerCenter));
    }
  }, [reportCornerCenter, eventsToListenFor]);

  return (
    <div className={styles.box} style={props.css}>
      <Corner ref={ref} corner="tl" />
    </div>
  )
};
