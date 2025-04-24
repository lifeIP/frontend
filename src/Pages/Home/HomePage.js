import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Fab, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router'

import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Главная
                </Typography>
            </Hat>
        </Center>
    );
}