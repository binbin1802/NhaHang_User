import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Autocomplete,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const ShowRestaurant = ({data}) => {

    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(`/restaurant/${item}`);
    }

    return (
        <div>
            <Card onClick={() => handleClick(data.id)}>
                <CardContent>
                    <Typography variant="h5" component="div">
                    {data.name  }
                    </Typography>
                    <CardMedia
                        component="img"
                        height="194"
                        image={data.image}
                        alt={data.name}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

const Home = () => {
    
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3333/restaurants')
        .then(response => {
            
            setData(response.data.map(item => {
                return {
                    label: item.name,
                    id: item.id
                }
            }));
        })
        .catch(error => {
            console.log(error);
        }
    )}, []);

    const handleChange = (event, value) => {
        setSearch(value.id);
    }

    const handleSubmit = async () => {

        if(search === '') {
            const response = await axios.get(`http://localhost:3333/restaurants`);
            setRestaurant(response.data);
        } else {
            const response = await axios.get(`http://localhost:3333/restaurant/id/${search}`);
            setRestaurant([response.data]);
        }
    }

    return (
        <div>
            <h1>Eats</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                    <div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={data}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Restaurant" />}
                            onChange={handleChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        <Button onClick={handleSubmit} variant="contained" color="primary">Search</Button>
                    </div>
                </Grid>
            </Grid>

            {
                restaurant.length !== 0 ? restaurant.map((item, id) => {
                    return <ShowRestaurant key={id} data={item} />
                }) : null
            }
        </div>
    );
}

export default Home;