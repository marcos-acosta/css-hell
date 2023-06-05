import React, { forwardRef } from 'react'
import styles from './Corner.module.css'
import { combineClassNames } from '../../util';

export default forwardRef(function Corner(props, ref) {
  const verticalStyle = props.corner[0] === "t" ? styles.top : styles.bottom;
  const horizontalStyle = props.corner[1] === "l" ? styles.left : styles.right;

  return (
    <div ref={ref} className={combineClassNames(styles.corner, verticalStyle, horizontalStyle)} />
  )
});
