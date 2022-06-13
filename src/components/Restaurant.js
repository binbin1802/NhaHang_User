import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import axios from 'axios';
import {
    Rating,
    Typography,
    Box,
    Button
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Restaurant = () => {

    let { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [value, setValue] = useState(0);
    const [foods, setFoods] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3333/restaurant/id/${id}`)
        .then(response => {
            setRestaurant(response.data);
            setValue(response.data.rate);
            setFoods(response.data.foods);
        })
    }, [id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        axios.post(`http://localhost:3333/restaurant/rating/${id}`, {
            rate: newValue
        }).then(response => {
            console.log(response.data);
        });
    }

    const handleClick = (item) => {
        navigate(`/book-restaurant/${item}`);
    }
    
    return (
        <div>
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image} alt={restaurant.name} />

            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={handleChange}
                />
            </Box>

            <Button variant="contained" color="primary" onClick={() => handleClick(restaurant.id)}>Book</Button>

            {
                foods.map(item => {
                    return (
                        <div key={item.id}>
                            <h2>{item.name} - {item.price}</h2>
                            <img src={item.image} alt={item.name} />
                        </div>
                    )
                })
            }

            <p>{restaurant.description}</p>
            <p>{restaurant.content}</p>
            <p>{restaurant.address}</p>
        </div>
    )
}

export default Restaurant;