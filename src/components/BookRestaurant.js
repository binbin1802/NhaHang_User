import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import axios from 'axios';
import {
    TextField,
    Button
} from '@mui/material';

const BookRestaurant = () => {

    const { id } = useParams();
    const [number_people, setNumberPeople] = useState(5);
    const [date, setDate] = useState('12/05/2022');
    const [time, setTime] = useState('12:00');
    const [phone, setPhone] = useState('0909259999');
    const [note, setNote] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3333/restaurant/book/${id}`, {
            number_people,
            date,
            time,
            phone,
            note
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <TextField
                label="Số người"
                id="standard-size-normal"
                defaultValue={number_people}
                onChange={(e) => setNumberPeople(e.target.value)}
                variant="standard"
            />

            <TextField
                label="Số điện thoại"
                id="standard-size-normal"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="standard"
            />

            <TextField
                label="Ngày đặt"
                id="standard-size-normal"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
                variant="standard"
            />

            <TextField
                label="Giờ đặt"
                id="standard-size-normal"
                defaultValue={time}
                onChange={(e) => setTime(e.target.value)}
                variant="standard"
            />

            <TextField
                label="Ghi chú"
                id="standard-size-normal"
                defaultValue={note}
                onChange={(e) => setNote(e.target.value)}
                variant="standard"
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>Book</Button>  
        </div>
    )
}

export default BookRestaurant;