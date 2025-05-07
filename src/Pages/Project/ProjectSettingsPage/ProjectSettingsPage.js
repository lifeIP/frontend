import React, { useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import { Box, Grid, Typography } from '@mui/material';
import ProjectCardPreview from '../CreateProject/components/ProjectCardPreview';
import ProjectCardPreviewSettings from '../CreateProject/components/ProjectCardPreviewSettings';
import ProjectMainSetting from '../CreateProject/components/ProjectMainSetting';
import axios from 'axios';
import { useNavigate } from 'react-router';
import settings from "../../../settings.json"

export default function ProjectSettingsPage(){
    const navigate = useNavigate();

    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [isImage, setImage] = useState();
    const [rows, setRows] = useState([]);
    const [imageEvent, setImageEvent] = useState();

    const sendProjectImage = async (project_id) => {
        if(imageEvent === undefined) return;
        try {
            const formData = new FormData(); // Создаем объект FormData для отправки файла
            formData.append(
                "file",
                imageEvent,
                imageEvent.name
            );

            await sendImageOnServer('/change_project-preview-image/' + project_id, formData); // Отправка файла на сервер
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при загрузке фото');
        }
    };

    const sendImageOnServer = async (url, formData) => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 || res.status === 201) {
                console.log('Файл успешно отправлен!');
            } else {
                throw new Error('Ошибка при отправке файла');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };


    async function updateProject() {
        let url = "/update-project-settings/";
        let data = {
            id: localStorage.getItem("last_project_id"),
            name: prjctName?prjctName:"",
            description: prjctDescription?prjctDescription:"",
            classes: [...rows],
        }
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.put(`${settings.server.addr}${url}`, data);

            if (res.status === 200 || res.status === 201) {
                sendProjectImage(res.data.id);
                localStorage.setItem("last_project_id", res.data.id);
                navigate("/project");
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
                        createProject={updateProject}
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