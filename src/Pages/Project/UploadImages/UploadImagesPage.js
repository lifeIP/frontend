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
    const [assigneeUserId, setAssigneeUserId] = useState(0);
    let project_id = -1;

    async function createTask() {
        project_id = JSON.parse(localStorage.getItem("last_project_id"));
        let url = "/create-task/";

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            
            const res = await axios.post(`${settings.server.addr}${url}`, {
                project_id: project_id,
                author_user_id: 1,
                assignee_user_id: assigneeUserId,
                description: "Описание",
                target_quantity: files.length
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
    const [recipients, setRecipients] = useState([]);

    async function get_all_members_in_project() {
        let url = "/get_all_members_in_project_without_me/" + JSON.parse(localStorage.getItem("last_project_id"));

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);
            if (res.status === 200 || res.status === 201) {
                let data = []
                res.data.members.map((item)=>{
                    data.push({id: item.member_id, name: item.name})
                })
                setRecipients(data);
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

    useEffect(()=>{get_all_members_in_project();}, []);

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



    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Загрузка фотографий
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: "1.75vh" }}>
                <CardContent>
                    <TaskForm recipients={recipients} setAssigneeUserId={setAssigneeUserId}/>
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