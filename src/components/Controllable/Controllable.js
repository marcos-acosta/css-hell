import React, { forwardRef } from "react";
import { interpretId } from "../../util";

export default forwardRef(function Controllable(props, ref) {
  const { hasContents, letter } = interpretId(props.id);

  return (
    <div style={props.styles} ref={ref} id={props.id}>
      {hasContents ? props.children : letter}
    </div>
  );
});
