import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import Styles from "./Style/RefSignup.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import wave from "./image/wave.png";

import { api_url } from "../../config";
import RefSignup2 from "./RefSignup2";


function RefSignup() {
  const [refCard, setRefCard] = useState();
  const [refCardVerified, setRefCardVerified] = useState(false);
  const [unhrcNumber, setUnhrcNumber] = useState();
  const [id, setId] = useState();

  const navigate = useNavigate();

  const onImageSelect = (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 10000000) {
      alert("File size should be below 10MB!")
      setRefCard()
    } else {
      setRefCard(e.target.files[0])
    }
  }

  const onSubmit = async (e) => {
    if(refCard) {
      const formData = new FormData()
      formData.append("id_proof", refCard);
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }

      // const data = {
      //   id_proof: formData,
      // }


      const res = await axios.post(`${api_url}auth/verify/`, formData, config)
      console.log(res.data);

      if(res.status == 200) {
        setRefCardVerified(true);
        setId(res.data.id);
        setUnhrcNumber(res.data.unhrc_number);

      }
    }
  }

  if(!refCardVerified) {
    return (
      <div className={Styles.container}>
        <div style={{ zIndex: "0", position: "fixed", width: "100vw", top: "0" }}>
          <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
        </div>
        <div style={{ zIndex: "2" }}>
          {" "}
          <h1 style={{ fontSize: "3em" }}>UPLOAD YOUR REFUGEE CARD HERE </h1>
          <Stack style={{justifyContent:"center"}} direction="row" alignItems="center" spacing={2}>
              <input accept="image/*" multiple type="file" className={Styles.uploadButton} onChange={onImageSelect} />
              <FileUploadIcon />
          </Stack>
        </div>
  
        <button className={Styles.submitButton} onClick={onSubmit}>Submit</button>
      </div>
    );
  } else {
    return (<RefSignup2 unhrc_number={unhrcNumber} id={id} />)
  }
  
}

export default RefSignup;
