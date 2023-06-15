import React, { forwardRef } from "react";
import styles from "./Controllable.module.css";
import { ELEMENT_TYPE, interpretId } from "../../util";

export default forwardRef(function Controllable(props, ref) {
  const { hasContents, letter, elementType } = interpretId(props.id);

  return (
    <div style={props.styles} ref={ref} id={props.id} onClick={props.onClick}>
      {hasContents ? (
        props.children
      ) : (
        <span
          className={
            elementType === ELEMENT_TYPE.peg
              ? styles.pegLetterAlign
              : styles.holeLetterAlign
          }
        >
          {letter}
        </span>
      )}
    </div>
  );
});
