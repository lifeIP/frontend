import React, { useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import { Box, Grid, Typography } from '@mui/material';
import ProjectCardPreview from '../CreateProject/components/ProjectCardPreview';
import ProjectCardPreviewSettings from '../CreateProject/components/ProjectCardPreviewSettings';
import ProjectMainSetting from '../CreateProject/components/ProjectMainSetting';

export default function ProjectSettingsPage(){
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [isImage, setImage] = useState();
    const [rows, setRows] = useState([]);
    const [imageEvent, setImageEvent] = useState();

    
    
    return(
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Настройки проекта
                </Typography>
            </Hat>
            
            <Box sx={{maxWidth: "51.05vw"}}>            
            <Grid container spacing={1} sx={{maxWidth: "51.05vw"}}>
                <Grid size={6}>
                    <ProjectCardPreview
                        isImage={isImage}
                        prjctName={prjctName}
                        prjctDescription={prjctDescription}
                        rows={rows}
                    />
                </Grid>
                <Grid size={6}>
                    <ProjectCardPreviewSettings
                        setImageEvent={setImageEvent}
                        createProject={()=>{console.log("")}}
                        setImage={setImage}
                        setPrjctName={setPrjctName}
                        setPrjctDescription={setPrjctDescription}
                    />
                </Grid>
            </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh', marginBottom: '1.85vh' }}>
                <ProjectMainSetting rows={rows} setRows={setRows} />
            </Box>
        
        </Center>
    );
}