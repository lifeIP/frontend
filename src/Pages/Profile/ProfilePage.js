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
import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';


export default function ProfilePage() {

    return (

        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Профиль
                </Typography>
            </Hat>

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