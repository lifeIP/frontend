import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import ImageView from './ImageView';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Actions from './Actions';


export default function SmartMarkup() {
    return (
        <Card sx={{ width: "51.05vw" }}>
            <TransformWrapper>
                <TransformComponent>
                    <ImageView />
                </TransformComponent>
            </TransformWrapper>
            <Actions />
        </Card>
    );
}