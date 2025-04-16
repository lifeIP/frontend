import settings from "../../../settings.json"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import axios from 'axios';

import { HuePicker } from "react-color";


// Основной компонент
const DynamicRowsWithColor = () => {
    const [rows, setRows] = useState([]);

    // Добавляем новую пустую строку
    const addNewRow = () => {
        setRows([...rows, { id: Date.now(), label: '', color: '#000000' }]);
    };

    // Обработчик изменения цвета строки
    const changeColor = (id, newColor) => {
        setRows(
            rows.map(row =>
                row.id === id ? { ...row, color: newColor } : row
            )
        );
    };

    // Обработчик изменения текста строки
    const changeLabel = (id, newLabel) => {
        setRows(
            rows.map(row =>
                row.id === id ? { ...row, label: newLabel } : row
            )
        );
    };

    return (
        <>
            <Button variant="contained" onClick={addNewRow}>
                Добавить строку
            </Button>
            <Box mt={2}>
                {rows.length > 0 && rows.map(row => (
                    <Box key={row.id} mb={2}>
                        <TextField
                            value={row.label}
                            placeholder="Название класса"
                            onChange={event => changeLabel(row.id, event.target.value)}
                        />
                        <HuePicker
                            color={row.color}
                            onChange={color => changeColor(row.id, color.hex)}
                            onChangeComplete={color => changeColor(row.id, color.hex)}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
};

function ProjectCardPreview() {
    return (
        <Card sx={{ width: "20vw", borderRadius: "12px", height: "45vh" }}>
            <CardMedia
                sx={{ height: "25vh" }}
                component="img"
                height="250px"
                image="https://steamuserimages-a.akamaihd.net/ugc/781852198000334383/FB420C9BB97252C586F11D0BAA9FE46EEAB4F720/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Название проекта
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign="justify">
                    Краткое описание проекта, оно не должно превышать определённого количества символов.
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: "10px" }}>
                    глаза, губы, самолёты
                </Typography>
            </CardContent>
        </Card>
    );
}

function ProjectCardPreviewSettings() {
    const fileInputRef = useRef();
    const [isLoading, setLoading] = useState(true);


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
            </CardContent>

            <CardContent>
                <Box>
                    <Button onClick={() => fileInputRef.current.click()}>Сменить фотографию</Button>
                    <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg" hidden />
                </Box>
                <TextField
                    label="Название проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" />
                <TextField
                    label="Описание проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" />

            </CardContent>
        </Card>
    );
}

function ProjectMainSetting() {
    return (
        <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Настройки классов
                </Typography>
            </CardContent>
            <DynamicRowsWithColor/>
        </Card>
    );
}


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