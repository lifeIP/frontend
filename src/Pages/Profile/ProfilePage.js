import { Box, Card, CardMedia, CardContent, Grid, Grid2, Typography, Paper } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useEffect } from 'react';
import axios from 'axios'
import settings from "../../settings.json"

function Profile() {
    const [is_load, setLoad] = useState(false)

    useEffect(() => {
        axios.get(settings.server.addr + "/user_info/")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <Card sx={{ borderRadius: "12px", width: "20vw", height: "50vh" }}>

            {!is_load ? (
                <Skeleton sx={{ height: "25vh" }} animation="wave" variant="rectangular" />
            ) : (
                <CardMedia
                    sx={{ height: "25vh", resize: "horizontal" }}
                    image="https://static.tildacdn.com/tild6332-3635-4161-b431-396233376631/Chel.svg"
                    title="user"
                    component="img"
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    <Skeleton animation="wave" />
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    <Skeleton animation="wave" />
                </Typography>

            </CardContent>
        </Card>

    );
}

function Statistics() {
    const [is_load, setLoad] = useState(true)
    return (
        <Card sx={{ borderRadius: "12px", width: "30vw", height: "50vh" }}>

            <CardContent>
                <Typography gutterBottom variant="h4" component="div" textAlign="center">
                Ресурсы
                </Typography>

            </CardContent>
            <CardContent>
               

                {!is_load ? (
                    <Skeleton sx={{ height: 235}} animation="wave" variant="rectangular" />
                ) : (
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'M124' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={235}
                    />
                )}
            </CardContent>

        </Card>

    );
}

function History() {
    return (
        <Card sx={{ borderRadius: "12px", width: "51.47vw", minHeight: "100px" }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    История
                </Typography>
            </CardContent>
        </Card>
    );
}

function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        // sx={{ minHeight: '80vh' }}
        >
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function ProfilePage() {

    return (

        <Center>
            <Grid container spacing={1}>
                <Grid size={4.88}>
                    <Profile />
                </Grid>
                <Grid size={6}>
                    <Statistics />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <History />
            </Box>
        </Center>
    );
}