import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from '../CreateProject/components/ProjectCardPreview';
import ImageViewer from './components/ImageViewer'

export default function ProjectPage() {
    const [projectId, setProjectId] = useState(0);

    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);


    useEffect(() => {
        setProjectId(localStorage.getItem("last_project_id"));
    }, []);

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проект {projectId}
                </Typography>
            </Hat>

            <Grid container spacing={1}>
                <Grid size={4.88}>
                    <ProjectCardPreview
                        isImage={isImage}
                        prjctName={prjctName}
                        prjctDescription={prjctDescription}
                        rows={rows}
                    />
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Фотографии
                    </Typography>
                </CardContent>

            </Card>

            <Box sx={{ width: "51.05vw" }}>
                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />
                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />
                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />
                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />
                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                    <Grid size={3}>
                        <ImageViewer setCanvasSize={() => { }} />

                    </Grid>
                </Grid>
            </Box>
        </Center>
    );
}