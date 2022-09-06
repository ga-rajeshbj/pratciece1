import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSlots } from '../redux/action/action';

const LandingPage = () => {

    const [slotNo, setSlotNo] = useState<any>("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(addSlots(slotNo))
        navigate("/parkspace")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        setSlotNo(e.target.value)

    }
    return (
        <div>

            <h1>ADD PARKING SLOTS</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField id="outlined-basic" label="Add Slots" variant="outlined" type={"text"} value={slotNo} onChange={handleChange} />

                </div>
                <br />
                <Button type='submit' variant="contained" color="primary" > add slots</Button>
            </form>
        </div>
    );
};

export default LandingPage;