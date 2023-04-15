import { useState } from "react";

import Styles from "./Style/DocSignup.module.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import wave from "./image/wave.png";

import axios from "axios";
import { api_url } from "../../config";


const DocSignup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [verificationCard, setVerificationCard] = useState();


  const SubmitHandler = async (event) => {
      event.preventDefault();

      if(verificationCard) {
        const formData = new FormData()
        formData.append("id_proof", verificationCard);
        formData.append("name", name);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("password", password);
        formData.append("phone_number", phone_number);
        formData.append("role", "DR");

        
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      

      const res = await axios.post(`${api_url}auth/register/`, formData, config)

      if(res.status == 200) {
          alert("Registered Successfully");
          setName("");
          setEmail("");
          setPassword("");
          setCity("");
          setCountry("");
          setPhoneNumber("");
      }
    };
    } 
    const onImageSelect = (e) => {
      if (e.target.files[0].size > 10000000) {
        alert("File size should be below 10MB!")
        setVerificationCard()
      } else {
        setVerificationCard(e.target.files[0])
      }
    }

  return (
    <>
      <div className="spacer"></div>
      <div>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <form onSubmit={SubmitHandler}>
        <div className={Styles.container1}>
          {" "}
          <h2>Sign Up</h2>
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="City"
            variant="standard"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Country"
            variant="standard"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Phone Number"
            variant="standard"
            value={phone_number}
            onChange={e => setPhoneNumber(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="contained" href="#contained-buttons" onClick={SubmitHandler}>
            Submit
          </Button>
        </div>
        <div className={Styles.V1}></div>
        <div className={Styles.container2}>
          {" "}
          <h2>Upload your Doctor Certification</h2>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              className={Styles.btn1}
              variant="contained"
              component="label"
            >
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={onImageSelect}/>
              <FileUploadIcon />
            </Button>
          </Stack>
        </div>
      </form>
    </>
  );
};

export default DocSignup;
