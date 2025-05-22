import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import MinimumDistanceSlider from './MinimumDistanceSlider';


export default function TaskManagement() {

    return (
        <Card sx={{
            borderRadius: "12px",
            width: "51.05vw",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
        }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center" fontWeight="bold">
                    Управление
                </Typography>
                <Typography>
                    Распределение классов в датасете
                </Typography>
                <Typography>
                    Разделение датасета на train/test/valid
                </Typography>
                <MinimumDistanceSlider/>
            </CardContent>
        </Card>
    );
}