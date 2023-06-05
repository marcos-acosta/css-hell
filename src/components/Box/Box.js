import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import styles from './Box.module.css'
import Corner from '../Corner/Corner'

export default function Box(props) {
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  const eventsToListenFor = useMemo(() => ["scroll", "resize"], []);

  const getCornerCenter = useCallback((ref) => {
    if (!ref.current) {
      return null;
    }
    const { left, top, right, bottom } = ref.current.getBoundingClientRect();
    return {
      left: left + (right - left) / 2,
      top: top + (bottom - top) / 2
    }
  }, []);

  const reportCornerCenter = useCallback(() => {
    if (tlRef.current && trRef.current && blRef.current && brRef.current) {
      props.setCornerCenter({
        "tl": getCornerCenter(tlRef),
        "tr": getCornerCenter(trRef),
        "bl": getCornerCenter(blRef),
        "br": getCornerCenter(brRef)
      });
    }
  }, [props, getCornerCenter, tlRef, trRef, blRef, brRef]);

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
      <Corner ref={tlRef} corner="tl" />
      <Corner ref={trRef} corner="tr" />
      <Corner ref={blRef} corner="bl" />
      <Corner ref={brRef} corner="br" />
    </div>
  )
};
