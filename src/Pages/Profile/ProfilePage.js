import {
    Box,
    Card,
    CardContent,
    Fab,
    Grid,
    Typography,
} from '@mui/material'


import React, { useEffect } from 'react';
import Profile from './components/Profile'
import Statistics from './components/Statistics';
import History from './components/History';
import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';

import { useNavigate } from 'react-router';
import ProjectsListPage from '../Project/ProjectsList/ProjectsListPage';

export default function ProfilePage() {
    const navigate = useNavigate();

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Профиль
                </Typography>
            </Hat>
            
            <Grid container spacing="1.05vw" maxWidth="51.05vw">
                <Grid>
                    <Profile />
                </Grid>
                <Grid>
                    <Statistics />
                </Grid>
            </Grid>
            <Box sx={{marginTop: '1.85vh'}}>
                <History/>
            </Box>
        </Center>
    );
}