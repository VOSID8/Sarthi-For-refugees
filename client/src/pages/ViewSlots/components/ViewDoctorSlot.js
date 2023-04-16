import React from 'react'
import styles from "../Styles/viewSlot.module.css";
import wave from "../images/wave.png";
import PatientList from './PatientList';
import Box from './Box';
import bottomImg from "../images/bottomImg.png"

function ViewDoctorSlot() {
  return (
    <div>
        <div style={{ position: "fixed", zIndex: "-1" }}>
          <img className={styles.bgimg} src={wave} alt="wave png image"></img>
        </div>
        <div className="spacer"></div>
        
        <h1 className={styles.heading}>APPOINTMENTS</h1>

        <div className={styles.columns}>
            <div>
              <PatientList />
            </div>
            <div>
              <div className={styles.boxes}>
                <Box top="NEXT CALL SCHEDULED AT" middle="15:00" bottom="Set Reminder" />
                <Box top="START A CALL" middle="+" bottom="Patient is waiting" />
                <Box top="CALLS TAKEN TODAY" middle="3" bottom="Great Job" />
              </div>
              <div>
                <img src={bottomImg} alt="" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default ViewDoctorSlot