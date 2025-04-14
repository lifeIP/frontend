import { Box, Button, CardActionArea, CardActions, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import SmartMarkup from './components/SmartMarkup';
import Center from '../../components/Center/Center'
import Hat from '../../components/Hat/Hat';
import { SmartMarkupProvider } from './components/SmartMarkupContext';

export default function WorkingField() {
    useEffect(() => { localStorage.setItem('rect_list', JSON.stringify([])); }, [])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Разметка
                </Typography>
            </Hat>

            <Box>
                {/* <SmartMarkupProvider> */}
                    <SmartMarkup project_id={1} />
                {/* </SmartMarkupProvider> */}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Информация
                        </Typography>
                        <Skeleton sx={{ height: "10vh" }} animation="wave" variant="rectangular" />
                    </CardContent>
                </Card>
            </Box>
        </Center>
    );
}