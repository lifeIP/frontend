import { 
    Box, 
    Card,  
    CardContent, 
    Grid, 
    Typography,
} from '@mui/material'

import React, { useEffect } from 'react';
import Profile from './components/Profile'
import Statistics from './components/Statistics';
import History from './components/History';



function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
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
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Профиль
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Grid container spacing={1}>
                <Grid size={4.88}>
                    <Profile />
                </Grid>
                <Grid size={6}>
                    <Statistics />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh', marginBottom: '1.85vh' }}>
                <History />
            </Box>
        </Center>
    );
}