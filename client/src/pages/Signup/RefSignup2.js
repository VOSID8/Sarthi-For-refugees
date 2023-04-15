import { useState, useContext } from "react";


import Styles from "./Style/RefSignup.module.css";
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

import axios from "axios"
import { api_url } from "../../config";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import CircularProgress from '@mui/material/CircularProgress';


const RefSignup2 = (props) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [dob, setDob] = useState();

    const [isLoading, setIsLoading] = useState(false);
    

    const authCtx = useContext(AuthContext)


    const SubmitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData();

        formData.append("name", name);
        formData.append("city", city);
        formData.append("email", email);
        formData.append("country", country);
        formData.append("password", password);
        formData.append("unhrc_number", props.unhrc_number);
        formData.append("image_id", props.id);
        formData.append("phone_number", phone_number);
        formData.append("date_of_birth", dob)
        formData.append("role", "RF");

        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        }

        const res = await axios.post(`${api_url}auth/register/`, formData, config)

        if(res.status == 201) {
            alert("Registered Successfully");
            setName("");
            setEmail("");
            setPassword("");
            setCity("");
            setCountry("");
            setDob("");
            setPhoneNumber("");

            setIsLoading(false);
        }
    };

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

          <div>UNHRC Number: {props.unhrc_number}</div>

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
          <input
            className={Styles.dobInput}
            type="date" 
            id="dob"
            onChange={e => setDob(e.target.value)}
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
            {isLoading && <CircularProgress />}
            {!isLoading && 'Submit'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RefSignup2;