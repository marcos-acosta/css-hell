import React, { forwardRef } from "react";
import styles from "./Controllable.module.css";
import { ELEMENT_TYPE, interpretId } from "../../util";

export default forwardRef(function Controllable(props, ref) {
  const { letter, elementType } = interpretId(props.id);

  return elementType === ELEMENT_TYPE.text ? (
    <span style={props.styles} id={props.id} onClick={props.onClick}>
      {props.text}
    </span>
  ) : (
    <div style={props.styles} ref={ref} id={props.id} onClick={props.onClick}>
      {elementType === ELEMENT_TYPE.div ? (
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
