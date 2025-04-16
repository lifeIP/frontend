import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Fab, Grid, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from "./components/ProjectCardPreview";
import ProjectCardPreviewSettings from "./components/ProjectCardPreviewSettings";
import ProjectMainSetting from './components/ProjectMainSetting';



export default function CreateProjectPage() {
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Создание проекта
                </Typography>
            </Hat>

            <Grid container spacing={1}>
                <Grid size={4.88}>
                    <ProjectCardPreview />
                </Grid>
                <Grid size={6}>
                    <ProjectCardPreviewSettings />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh', marginBottom: '1.85vh' }}>
                <ProjectMainSetting />
            </Box>
        </Center>
    );
}