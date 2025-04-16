import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import CreateClassComponent from "./CreateClassComponent"



function ProjectMainSetting() {
    return (
        <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Настройки классов
                </Typography>
            </CardContent>
            <CreateClassComponent />
        </Card>
    );
}

export default ProjectMainSetting;