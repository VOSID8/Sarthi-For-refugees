import React from 'react'
import styles from '../Styles/patientList.module.css'

function PatientList() {
  return (
    <div className={styles.patientList}>
        <div className={styles.listHeading}>CURRENT PATIENT LIST</div>
        <div className={styles.listItem}>
            <div className={styles.listItemLeft}>
                <div className={styles.timeDetails}>
                    <div className={styles.itemDate}>16-04-23</div>
                    <div className={styles.itemTime}>15:00</div>
                </div>
                
                <div className={styles.patientName}>PATIENT NAME - TBD</div>
            </div>
            <div className={styles.listItemRight}>
                More Details
            </div>
            
        </div>
        <div className={styles.listItem}>
            <div className={styles.listItemLeft}>
                <div className={styles.timeDetails}>
                    <div className={styles.itemDate}>16-04-23</div>
                    <div className={styles.itemTime}>16:00</div>
                </div>
                
                <div className={styles.patientName}>PATIENT NAME - TBD</div>
            </div>
            <div className={styles.listItemRight}>
                More Details
            </div>
            
        </div>
        <div className={styles.listItem}>
            <div className={styles.listItemLeft}>
                <div className={styles.timeDetails}>
                    <div className={styles.itemDate}>18-04-23</div>
                    <div className={styles.itemTime}>15:00</div>
                </div>
                
                <div className={styles.patientName}>PATIENT NAME - TBD</div>
            </div>
            <div className={styles.listItemRight}>
                More Details
            </div>
            
        </div>
        <div className={styles.listItem}>
            <div className={styles.listItemLeft}>
                <div className={styles.timeDetails}>
                    <div className={styles.itemDate}>19-04-23</div>
                    <div className={styles.itemTime}>11:00</div>
                </div>
                
                <div className={styles.patientName}>PATIENT NAME - TBD</div>
            </div>
            <div className={styles.listItemRight}>
                More Details
            </div>
            
        </div>
        <div className={styles.listItem}>
            <div className={styles.listItemLeft}>
                <div className={styles.timeDetails}>
                    <div className={styles.itemDate}>20-03-23</div>
                    <div className={styles.itemTime}>11:00</div>
                </div>
                
                <div className={styles.patientName}>PATIENT NAME - TBD</div>
            </div>
            <div className={styles.listItemRight}>
                More Details
            </div>
            
        </div>
       
    </div>
  )
}

export default PatientList