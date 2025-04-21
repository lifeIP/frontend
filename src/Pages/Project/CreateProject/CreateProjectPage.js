import settings from "../../../settings.json"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Fab, Grid, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from "./components/ProjectCardPreview";
import ProjectCardPreviewSettings from "./components/ProjectCardPreviewSettings";
import ProjectMainSetting from './components/ProjectMainSetting';
import axios from "axios";


// TODO: Надо добавить валидацию
export default function CreateProjectPage() {
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [isImage, setImage] = useState();
    const [rows, setRows] = useState([]);

    async function createProject(){
        let url = "/create-project/";
        let data = {
            name: prjctName,
            description: prjctDescription,
            classes: [...rows],
        }
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, data);

            if (res.status === 200 || res.status === 201) {
                console.log('Проект успешно создан!');
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(data);
            console.error(err);
            throw err;
        }
    }

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
                        rows={rows}
                    />
                </Grid>
                <Grid size={6}>
                    <ProjectCardPreviewSettings 
                    createProject={createProject}
                    setImage={setImage}
                    setPrjctName={setPrjctName}
                    setPrjctDescription={setPrjctDescription}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh', marginBottom: '1.85vh' }}>
                <ProjectMainSetting rows={rows} setRows={setRows}/>
            </Box>
        </Center>
    );
}