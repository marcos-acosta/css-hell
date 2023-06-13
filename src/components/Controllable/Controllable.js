import React, { forwardRef, useCallback, useEffect } from "react";
import { matchingIdToLetter } from "../../util";

export default forwardRef(function Controllable(props, ref) {
  const letter = props.isTarget && matchingIdToLetter(props.matchingId);
  const propsReportBbox = props.reportBbox;

  const bbox = ref.current && ref.current.getBoundingClientRect();

  const reportBbox = useCallback(
    () => ref.current && propsReportBbox(ref.current.getBoundingClientRect()),
    [ref, propsReportBbox]
  );

  useEffect(() => reportBbox(), [bbox, reportBbox]);

  return (
    <div style={props.styles} ref={ref} id={props.id}>
      {props.isTarget ? letter : props.children}
    </div>
  );
});
