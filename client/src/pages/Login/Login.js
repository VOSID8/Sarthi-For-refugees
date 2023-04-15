import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Styles from "./Style/Login.module.css";
import wave from "./image/wave.png";

import axios from "axios";
import { api_url } from "../../config";
import AuthContext from "../../store/auth-context";


const Login = () => {
  // const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      "email": email,
      "password": password,
    }
  
    const res = await axios.post(`${api_url}auth/login/`, data)

    if(res.status == 200) {
      authCtx.login(res.data.token);
      alert('Logged in Successfully');
      setEmail("");
      setPassword("");
      // navigate("/");
    }else {
      alert('Incorrect email or password')
    }
  }


  return (
    <>
      <div>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className={Styles.loginCard}>
        <h2>Login</h2>
        <div className={Styles.textfield}>
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={Styles.field}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" href="#contained-buttons" onClick={submitHandler}>
            Log In
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
