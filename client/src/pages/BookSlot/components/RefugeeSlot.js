import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Calendar from "react-calendar";
import styles from "../Styles/refugeeSlot.module.css";
import buttonStyles from "../Styles/Button.module.css"
import "react-calendar/dist/Calendar.css";
import RefugeeButton from "./RefugeeButton";
import left_triangle from "../images/left_triangle.png";
import wave from "../images/wave.png";
import { api_url } from "../../../config";

// import { Button } from "@mui/material";

import axios from "axios";

import avatar from "../images/avatar.png";

function RefugeeSlot() {
  const [timeSlot, setTimeSlot] = useState([]);
  const [value, onChange] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);


  const dateFormat = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate();

  const navigate = useNavigate();


  const submitHandler = async () => {
    const token = localStorage.getItem("rehmat-token");

    const config = {
        headers: {
            "Authorization": `Token ${token}`
        }
    }


    const data = {
        "date": dateFormat,
        "time": timeSlot
    }

    const res = await axios.post(`${api_url}slot/schedule/`, data, config)

    if(res.status == 201) {
      alert("Slot Booked!")
    }

  }

  useEffect(() => {
    console.log(timeSlot);
  }, [timeSlot]);



  useEffect(() => {
    const getSlots = async () => {
        const token = localStorage.getItem("rehmat-token");

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }


        const data = {
            "date": dateFormat,
        }
    
        const res = await axios.post(`${api_url}slot/available-slots/`, data, config)
        setAvailableSlots(res.data)
        console.log(res)
    }
    
    getSlots();
    
  }, [dateFormat])


  return (
    <div>
      <div style={{ position: "fixed", zIndex: "-1" }}>
        <img className={styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className="spacer"></div>


      <h1 className={styles.heading}>BOOK AN APPOINTMENT</h1>
      <div className={styles.columns}>
        <div className={styles.calendarDiv}>
          <Calendar onChange={onChange} value={value} />
        </div>
        <div>
          {" "}
          <div className={styles.slotsDiv}>
            {
              availableSlots.map(slot => {
                {console.log(slot)}
                return (
                  <button
                    className={timeSlot=={slot}?`${buttonStyles.slotButton} ${buttonStyles.selected}`:buttonStyles.slotButton}
                    onClick={e => {setTimeSlot(slot)}}
                  >
                    {slot}
                  </button>
                )
                
              })
              
            }
            
            
          </div>
          {/* <a href="https://rehmat-api.ccstiet.com/slot/call/1/1" className={styles.vidBtn} target="_blank">Book Slot</a> */}
          <button className={styles.vidBtn} onClick={submitHandler}>Book Slot</button>

        </div>
      </div>

      {/* <Button variant="contained" onClick={submitHandler}>SUBMTI</Button> */}

      {/* <button style={{display: "block", margin: "50px auto", width: "150px", height: "40px", backgroundColor: "darkblue", color: "white"}} onClick={submitHandler}>SUBMIT</button> */}

      <img
        style={{ height: " 22vh", position: "fixed", bottom: " 0%" }}
        src={left_triangle}
        alt="left triangle png"
      ></img>
    </div>
  );
}

export default RefugeeSlot;
