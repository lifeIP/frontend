import {
    Box,
    Card,
    CardContent,
    Fab,
    Grid,
    Typography,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';

import React, { useEffect } from 'react';
import Profile from './components/Profile'
import Statistics from './components/Statistics';
import History from './components/History';
import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';

import { useNavigate } from 'react-router';

export default function ProfilePage() {
    const navigate = useNavigate()

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

            <Box sx={{ marginBottom: '1.85vh', marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Ваши проекты
                        </Typography>
                    </CardContent>

                    
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Fab size="medium" aria-label="добавить класс" onClick={() => { navigate("/create-project") }}>
                                <AddIcon />
                            </Fab>
                        </Box>
                        <CardContent>
                    </CardContent>
                </Card>
            </Box>
        </Center>
    );
}