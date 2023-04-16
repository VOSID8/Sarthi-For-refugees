import React from 'react'
import styles from '../Styles/box.module.css'

function Box(props) {
  return (
    <div className={styles.box}>
        <div className={styles.top}>{props.top}</div>
        <div className={styles.middle}><a href="https://sarthi-api.visionofsid.com/slot/call/1" target="_blank">{props.middle}</a></div>
        <div className={styles.bottom}>{props.bottom}</div>
    </div>
  )
}

export default Box