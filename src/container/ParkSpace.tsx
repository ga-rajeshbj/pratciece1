import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


interface ParkingSlots {
    isParked: boolean
    slotNum: number
    parkTime: number
    carNum: string
}
const ParkSpace = () => {

    const [parkingSlots, setParkingSlots] = useState<ParkingSlots[] | []>([])
    const [carNum, setCarNum] = useState<string>("")
    const [parkTime, setParkTime] = useState<number>(0)

    const [exitNum, setExitNum] = useState<number>(0)
    const [parkCharge, setParkCharge] = useState<any>("")
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);

    const handleClose = () => setOpen(false);
    const handleCloseTwo = () => setOpenTwo(false);

    const slotsNum = useSelector((state: RootState) => state.slotReducer.slots)

    useEffect(() => {


        for (let i = 1; i <= slotsNum; i++) {
            setParkingSlots(current => [...current, {
                isParked: false,
                slotNum: i,
                parkTime: 0,
                carNum: ""
            }])

        }


        return () => {
            setParkingSlots([])
        }

    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        handleRandomAllocation()

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        setCarNum(e.target.value)

    }

    const handleOpen = () => {
        setOpen(true)
        let today = new Date()

        let curTime = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()

        setParkTime(curTime)



    };


    const handleRandomAllocation = () => {

        let allocatedSlots: any[] = []


        for (let i = 0; i < parkingSlots.length; i++) {

            if (!parkingSlots[i].isParked) {

                allocatedSlots.push(parkingSlots[i].slotNum)
            }

        }

        console.log(allocatedSlots)

        if (allocatedSlots.length === 0) {
            alert("slots are full")
        } else {
            let randomNum = Math.floor(Math.random() * allocatedSlots.length)

            let randomSlot = allocatedSlots[randomNum]


            setParkingSlots(parkingSlots.map((item: ParkingSlots) => {

                if (item.slotNum == randomSlot) {
                    return {
                        ...item,
                        isParked: true,

                        parkTime: parkTime,
                        carNum: carNum
                    }
                } else {
                    return item
                }
            }))
        }

    }


    const handleExit = (item: ParkingSlots) => {
        setOpenTwo(true)
        setExitNum(item.slotNum)
        let today = new Date()
        let curTime = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()


        let parkedHoue = curTime - item.parkTime
        let hours = Math.floor(parkedHoue / 3600); // get hours
        let minutes = Math.floor((parkedHoue - (hours * 3600)) / 60); // get minutes
        let seconds = parkedHoue - (hours * 3600) - (minutes * 60); //  get seconds]
        let charge = hours <= 2 ? 10 : (hours * 10) - 10
        setParkCharge(charge)

    }

    const handlePayment = () => {

    }
    return (
        <div>
            <h1>Parking Spaces</h1>

            <div>
                <Button onClick={handleOpen}>
                    Allocate Parking SPace Random
                </Button>
            </div>

            <Grid container spacing={2}>
                {parkingSlots.map((item: ParkingSlots) => (
                    <Grid item xs={4}>
                        <Card sx={{ minHeight: 150 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 18 }} color="secondary" gutterBottom>
                                    Parking Slot : {item.slotNum}
                                </Typography>
                            </CardContent>
                            {item.isParked && <CardContent>

                                <Typography variant="body2">
                                    Car Number :{item.carNum}

                                </Typography>

                                <CardActions>
                                    <Button onClick={() => handleExit(item)} size="small" variant='contained'>Exit car</Button>
                                </CardActions>
                            </CardContent>}

                        </Card>
                    </Grid>

                ))}

            </Grid>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter Car Details
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField id="outlined-basic" label="Add Slots" variant="outlined" type={"text"} value={carNum} onChange={handleChange} />

                        </div>
                        <br />
                        <Button type='submit' variant="contained" color="primary" > add slots</Button>
                    </form>

                </Box>
            </Modal>



            <Modal
                open={openTwo}
                onClose={handleCloseTwo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        paking charge :{parkCharge}
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button onClick={handlePayment}> payment</Button>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button onClick={handleCloseTwo}> back</Button>
                    </Typography>



                </Box>
            </Modal>

        </div>
    );
};

export default ParkSpace;