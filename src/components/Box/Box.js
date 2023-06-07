import React, { useEffect, useMemo, useCallback, useRef } from "react";
import Corner from "../Corner/Corner";

export default function Box(props) {
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const brRef = useRef(null);
  const blRef = useRef(null);

  const eventsToListenFor = useMemo(() => ["scroll", "resize"], []);

  const getCornerCenter = useCallback((ref) => {
    if (!ref.current) {
      return null;
    }
    const { left, top, right, bottom } = ref.current.getBoundingClientRect();
    return {
      left: left + (right - left) / 2,
      top: top + (bottom - top) / 2,
    };
  }, []);

  const reportCornerCenter = useCallback(() => {
    if (tlRef.current && trRef.current && brRef.current && blRef.current) {
      props.setCornerCenter({
        tl: getCornerCenter(tlRef),
        tr: getCornerCenter(trRef),
        br: getCornerCenter(brRef),
        bl: getCornerCenter(blRef),
      });
    }
  }, [props, getCornerCenter, tlRef, trRef, brRef, blRef]);

  useEffect(() => {
    reportCornerCenter();
  });

  useEffect(() => {
    eventsToListenFor.forEach((eventName) =>
      window.addEventListener(eventName, reportCornerCenter)
    );
    return () => {
      eventsToListenFor.forEach((eventName) =>
        window.removeEventListener(eventName, reportCornerCenter)
      );
    };
  }, [reportCornerCenter, eventsToListenFor]);

  return (
    <div style={props.css}>
      <Corner ref={tlRef} corner="tl" />
      <Corner ref={trRef} corner="tr" />
      {props.character}
      <Corner ref={brRef} corner="br" />
      <Corner ref={blRef} corner="bl" />
    </div>
  );
}
