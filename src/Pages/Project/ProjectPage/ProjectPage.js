import { Box, Typography } from '@mui/material';
import React from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';


export default function ProjectPage() {
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проект
                </Typography>
            </Hat>
        </Center>
    );
}