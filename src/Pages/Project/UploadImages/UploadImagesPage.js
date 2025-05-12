import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import DragDropFileUpload from './components/DragDropFileUpload';
import ImageUploadViewer from './components/ImageUploadViewer';
import axios from 'axios';
import settings from "../../../settings.json"
import TaskForm from './components/TaskForm';

export default function UploadImagesPage() {
    const [files, setFiles] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [dragDropDisabled, setDragDropDisabled] = useState(false);
    const [startUpload, setStartUpload] = useState(false);
    let project_id = -1;

    async function createTask() {
        let url = "/create-task/";

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, {
                project_id: project_id,
                author_user_id: 1,
                assignee_user_id: 1,
                description: "Описание"
            });

            if (res.status === 200 || res.status === 201) {
                setStartUpload(true);
                setButtonDisabled(true);
            } else {
            }
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        project_id = JSON.parse(localStorage.getItem("last_project_id"));
        if (files.length == 0) return;
        setButtonDisabled(false);
    }, [files]);

    const handleFileUpload = (files) => {
        let all_files = []
        if (files === undefined) return;
        if (files.length === 0) return;
        Array.from(files).map(element => {
            let file_type = element.type;
            if (file_type === "image/jpg" || file_type === "image/jpeg" || file_type === "image/png") {
                console.log("Доступно");
                all_files.push(element);
            }
        });
        setFiles(all_files);
        setDragDropDisabled(true);
    };


    const recipients = [
        { id: 1, name: 'Иван Иванов' },
        { id: 2, name: 'Марья Сидорова' },
    ];
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Загрузка фотографий
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: "1.75vh"}}>
                <CardContent>
                    <TaskForm recipients={recipients} />
                </CardContent>
            </Card>

            <DragDropFileUpload disabled={dragDropDisabled} onFileUpload={handleFileUpload} />
            <Button
                disabled={buttonDisabled}
                variant='contained'
                fullWidth
                sx={{ marginTop: "1.75vh" }}
                onClick={() => {
                    createTask();
                }}
            >Отправить</Button>

            <Box sx={{ maxWidth: "51.05vw", marginTop: "1.75vh" }}>
                <Grid container spacing={1}>
                    {files.map((item) => (
                        <Grid size={3}>
                            <ImageUploadViewer disabled={buttonDisabled} file={item} startUpload={startUpload} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
}