import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Fab, Grid, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from "./components/ProjectCardPreview";
import ProjectCardPreviewSettings from "./components/ProjectCardPreviewSettings";
import ProjectMainSetting from './components/ProjectMainSetting';



export default function CreateProjectPage() {
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [prjctListClasses, setPrjctListClasses] = useState(["class1", "class2", "class3"]);
    const [isImage, setImage] = useState();

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Создание проекта
                </Typography>
            </Hat>

            <Grid container spacing={1}>
                <Grid size={4.88}>
                    <ProjectCardPreview
                        isImage={isImage}
                        prjctName={prjctName}
                        prjctDescription={prjctDescription}
                        prjctListClasses={prjctListClasses}
                    />
                </Grid>
                <Grid size={6}>
                    <ProjectCardPreviewSettings 
                    setImage={setImage}
                    setPrjctName={setPrjctName}
                    setPrjctDescription={setPrjctDescription}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh', marginBottom: '1.85vh' }}>
                <ProjectMainSetting />
            </Box>
        </Center>
    );
}