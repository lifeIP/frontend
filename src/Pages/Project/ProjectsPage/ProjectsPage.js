import { Box, Card, CardContent, Fab, Typography } from '@mui/material';
import React from 'react';

import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectsListPage from '../ProjectsList/ProjectsListPage';

import AddIcon from '@mui/icons-material/Add';
import InvitationDialog from './components/InvitationDialog';

export default function ProjectsPage() {
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проекты
                </Typography>
            </Hat>

            <ProjectsListPage />
            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh', marginTop: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Сторонние проекты
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <InvitationDialog/>
                    
                </Box>
                <CardContent>
                </CardContent>
            </Card>
        </Center>
    );
}