import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios'
import settings from "../../settings.json"

export default function ProfilePage() {
    useEffect(() => {
        axios.get(settings.server.addr + "/protected/")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        //             console.log(res);
        //             localStorage.getItem('access_token');
        //             localStorage.setItem('refresh_token');
        //             navigate("/")
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
    }, []);

    return (
        <Box>
            <Typography variant='h1'>Profile</Typography>
        </Box>
    );
}