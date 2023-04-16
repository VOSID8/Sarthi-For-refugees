import React, { useState, useEffect } from 'react'
import styles from "../Styles/viewSlot.module.css";
import wave from "../images/wave.png";
import avatar from "../images/avatar.png";
import axios from 'axios';
import { api_url } from '../../../config';

function ViewRefugeeSlot() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("rehmat-token");

      const config = {
          headers: {
              "Authorization": `Token ${token}`
          }
      }
      
      const res = await axios.get(`${api_url}slot/view/scheduled/refugee/`, config)
      setDate(res.data[0].date_str)
      setTime(res.data[0].time_str)
      setDoctor(res.data[0].doctor)
    }

    getData();
  })


  return (
    <div>
        <div style={{ position: "fixed", zIndex: "-1" }}>
          <img className={styles.bgimg} src={wave} alt="wave png image"></img>
        </div>
        <div className="spacer"></div>

        <h1 className={styles.heading}>CURRENT APPOINTMENTS</h1>
        {/* <div>You have no current appointments</div> */}
        <div className={styles.container}>
          <div className={styles.avatarDiv}>
            {" "}
            <img
              style={{ width: "7vw" }}
              src={avatar}
              alt="avatar image"
            ></img>
            <div>
              <h3>{doctor}</h3>
              <div className={styles.timeDetails}>
                <div>{date}</div>
                <div>{time}</div>
              </div>
            </div>
            
          </div>
          <div>
              <a href="https://rehmat-api.ccstiet.com/slot/call/1" className={styles.vidBtn} target="_blank">Start Video Call</a>
          </div>
        </div>
    </div>
  )
}

export default ViewRefugeeSlot