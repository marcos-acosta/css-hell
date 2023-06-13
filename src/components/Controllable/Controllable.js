import React, { forwardRef } from "react";
import { matchingIdToLetter } from "../../util";

export default forwardRef(function Controllable(props, ref) {
  const letter = props.isTarget && matchingIdToLetter(props.matchingId);

  return (
    <div style={props.styles} ref={ref} id={props.id}>
      {props.isTarget ? letter : props.children}
    </div>
  );
});
