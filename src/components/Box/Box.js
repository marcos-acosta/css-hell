import React from 'react'
import styles from './Box.module.css'
import Edgepoint from '../Edgepoint/Edgepoint'

export default function Box(props) {
  return (
    <div className={styles.box} style={{marginLeft: `${props.width}vw`}}>
      <Edgepoint corner="tl" setCornerCenter={console.log}/>
    </div>
  )
}
