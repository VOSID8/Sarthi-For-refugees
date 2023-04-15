import React from "react";
import wave from "./Images/wave.png";
import mail from "./Images/mail_img.jpg";
import Styles from "./Style/Contact.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const Contact = () => {
  return (
    <>
      <div>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className={Styles.bigcontainer}>
        <h2 style={{fontFamily: "'Poppins', sans-serif"}}>HAVE SOME QUESTIONS ?</h2>
        <div className={Styles.container}>
          <div>
            <img className={Styles.mailImg} src={mail} alt="mail image"></img>
          </div>
          <div className={Styles.textfield}>
            <TextField
              className={Styles.field}
              id="standard-basic"
              label="First Name"
              variant="standard"
            />
            <TextField
              className={Styles.field}
              id="standard-basic"
              label="Last Name"
              variant="standard"
            />
            <TextField
              className={Styles.field}
              id="standard-basic"
              label="Email"
              variant="standard"
            />
            <TextField
            className={Styles.field}
              id="standard-multiline-static"
              label="Your Questions"
              multiline
              rows={4}
              variant="standard"
            />
            <Button variant="contained" href="#contained-buttons">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
