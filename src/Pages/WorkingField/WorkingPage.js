import { Box, Button, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import SmartMarkup from './components/SmartMarkup';
import Center from '../../components/Center/Center'
import Hat from '../../components/Hat/Hat';

export default function WorkingField() {
    useEffect(()=>{localStorage.setItem('rect_list', JSON.stringify([]));}, [])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Разметка
                </Typography>
            </Hat>

            <Box>
                <SmartMarkup />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Информация
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Center>
    );
}