import React, { memo } from 'react'
import styles from './Box.module.css'
import Corner from '../Corner/Corner'

export default memo(function Box(props) {

  return (
    <div className={styles.box} style={{marginLeft: `${props.width}vw`}}>
      <Corner corner="tl" setCornerCenter={props.setTlCenter}/>
    </div>
  )
});
