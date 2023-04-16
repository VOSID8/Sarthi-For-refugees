import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewDoctorSlot from './components/ViewDoctorSlot';
import ViewRefugeeSlot from './components/ViewRefugeeSlot';

import axios from 'axios';
import { api_url } from '../../config';

function ViewSlot() {
    const [userType, setUserType] = useState();
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
            <ViewRefugeeSlot />
        )
    }else if(userType == "doctor") {
        return (
            <ViewDoctorSlot />

        )
    }
}

export default ViewSlot