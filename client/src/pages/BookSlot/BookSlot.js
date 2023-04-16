import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RefugeeSlot from './components/RefugeeSlot';
import DoctorSlot from './components/DoctorSlot';
import { api_url } from "../../config";
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

function BookSlot() {
    const [userType, setUserType] = useState();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("rehmat-token");
    
        if(!token) {
            navigate("/refugee-signup")
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("rehmat-token");

            const config = {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }

            const res = await axios.get(`${api_url}auth/role/`, config);

            if(res.data.role == "refugee") {
                setUserType("refugee")
            }else {
                return (
                    setUserType("doctor")
                )
            }
        }

        getUser();

        
    }, [])


    if(userType == "refugee") {
        return (
            <RefugeeSlot />
        )
    }else if(userType == "doctor") {
        return (
            <Doctor />
        )
    }
    
}

export default BookSlot