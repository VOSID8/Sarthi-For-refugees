import React from "react";

import styles from "./styles/Meet.module.css";
import sideImg from "./images/sideImg.png";
import triangle from "./images/triangle.png";
import { Button } from "@mui/material";
import video from "./images/Group11.png";
import { Link } from "react-router-dom";

const Meet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <div className={styles.div1}></div>
        <div className={styles.div2}>
          <Link className={styles.meetBtn} to="#">
            <img className={styles.meetBtn} src={video}></img>
          </Link>
          <Link to="#">
            <img className={styles.meetBtn} src={video}></img>
          </Link>
          <Link to="#">
            <img className={styles.meetBtn} src={video}></img>
          </Link>
        </div>
      </div>
      <div className={styles.box2}>
        <img className={styles.sideImg} src={sideImg} alt="side image"></img>
        <Button variant="contained" href="#contained-buttons">
          DOWNLOAD PRESCRIPTION
        </Button>
      </div>
      <img
        className={styles.bottomimg}
        src={triangle}
        alt="triangar image"
      ></img>
    </div>
  );
};

export default Meet;
