import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import settings from "../../../../settings.json";
import React, { useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";



function ProjectCardPreviewSettings() {
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    const handleCreateProjectButtonClicked = () => {
        navigate("/project");
    };

    const handleChange = async (event) => {
        try {
            const formData = new FormData(); // Создаем объект FormData для отправки файла
            formData.append(
                "file",
                event.target.files[0],
                event.target.files[0].name
            );

            // await sendImageOnServer('/upload-image-on-profile/', formData); // Отправка файла на сервер

            setLoading(true);
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

    return (
        <Card sx={{ borderRadius: "12px", width: "30vw", height: "45vh" }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" textAlign="center">
                    Внешний вид
                </Typography>

                <TextField
                    sx={{ marginTop: "15px" }}
                    fullWidth
                    label="Название проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" />
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    sx={{ marginTop: "15px" }}
                    label="Описание проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" />

                <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={() => fileInputRef.current.click()}>Сменить фотографию проекта</Button>
                    <Button variant="contained" onClick={() => handleCreateProjectButtonClicked()} sx={{marginLeft: "15px"}}>Создать</Button>
                    <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg" hidden />
                </Box>
                
            </CardContent>
        </Card>
    );
}

export default ProjectCardPreviewSettings;