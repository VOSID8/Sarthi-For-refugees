import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RefugeeSlot from './components/RefugeeSlot';
import DoctorSlot from './components/DoctorSlot';

function BookSlot() {
    const [userType, setUserType] = useState();

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get("");
            if(res.data.user_type == "refugee") {
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
            <DoctorSlot />
        )
    }
    
}

export default BookSlot