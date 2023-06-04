import React, { memo } from 'react'
import styles from './Box.module.css'
import Edgepoint from '../Edgepoint/Edgepoint'

export default memo(function Box(props) {

  return (
    <div className={styles.box} style={{marginLeft: `${props.width}vw`}}>
      <Edgepoint corner="tl" setCornerCenter={props.setTlCenter}/>
    </div>
  )
});
