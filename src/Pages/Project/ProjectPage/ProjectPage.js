import { Box, Card, CardContent, Fab, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from './components/ProjectCardPreview';
import ImageViewer from './components/ImageViewer'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import axios from 'axios';
import settings from "../../../settings.json"
import ListOfMembers from './components/ListOfMembers';


import PhotoPagination from './components/PhotoPagination';
import DatasetPage from '../DatasetPage/DatasetPage';

export default function ProjectPage() {
    const navigate = useNavigate()
    const [projectId, setProjectId] = useState(0);

    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);
    const [listTasks, setListTasks] = useState([]);



    async function getInfoOfProjects() {
        let url = "/get-projects-info-by-id/" + projectId;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                // setListProjects(res.data);
                console.log(res.data);
                setPrjctName(res.data.name);
                setPrjctDescription(res.data.description);
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async function getListOfClassesInProject() {
        let url = "/get_list_of_classes_in_project/" + projectId;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                let list_of_class_name = []

                res.data.map((item) => {
                    list_of_class_name.push({ label: item.class_name });
                })
                setRows(list_of_class_name);
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    async function getProjectsPhotoPreviewById() {

        let url = `/get-projects-photo-preview-by-id/${projectId}?t=${Date.now()}`;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`, {
                responseType: "arraybuffer"
            });

            if (res.status === 200 || res.status === 201) {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setImage(`data:image/jpeg;charset=utf-8;base64,${base64}`);
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };



    async function getListOfTasks(project_id) {
        let url = "/get-member-task-info-in-project/" + project_id + "/" + JSON.parse(localStorage.getItem("user_id"));

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListTasks(res.data.tasks);
            } else {
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setProjectId(localStorage.getItem("last_project_id"));
    }, []);

    useEffect(() => {
        if (projectId != 0) {
            getInfoOfProjects();
            getListOfClassesInProject();
            getProjectsPhotoPreviewById();
            getListOfTasks(projectId);
        }
    }, [projectId])




    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проект
                </Typography>
            </Hat>

            <Box sx={{ maxWidth: "51.05vw" }}>
                <Grid container spacing={1}>
                    <Grid size={6}>
                        <ProjectCardPreview
                        settingsIconRender={JSON.parse(localStorage.getItem("user_rights")) <= 1}
                            isImage={isImage}
                            prjctName={prjctName}
                            prjctDescription={prjctDescription}
                            rows={rows}
                        />
                    </Grid>
                    <Grid size={6}>
                        <ListOfMembers renderAddButton={JSON.parse(localStorage.getItem("user_rights")) <= 1} />
                    </Grid>
                </Grid>
            </Box>

            {
                JSON.parse(localStorage.getItem("user_rights")) <= 1 ? (
                    <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" textAlign="center">
                                Набор данных
                            </Typography>
                        </CardContent>
                        <DatasetPage />
                    </Card>) : (<></>)

            }
            {listTasks.length == 0 ? (<></>) : (
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Ваши задачи
                        </Typography>
                    </CardContent>

                    {/* Отображение Ваших задач */}
                    <CardContent>
                        <List disablePadding>
                            {listTasks.map((item) => (
                                <ListItem
                                    onClick={() => {
                                        localStorage.setItem("last_task_id", item.task_id);
                                        navigate("/task");
                                        console.log("task_id " + item.task_id);
                                    }}

                                    button
                                    divider
                                    key={item.task_id}
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        borderRadius: '8px',
                                        bgcolor: 'background.paper',
                                        border: '1px solid rgba(0, 0, 0, 0.1)', // Тонкая граница вокруг пункта
                                        '&:hover': {
                                            //   backgroundColor: '#F0F0FF', // Светлый голубой оттенок при наведении
                                            transform: 'scale(1.01)', // Легкий эффект увеличения при наведении
                                            transition: '.3s ease-in-out',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                ID {item.task_id} Количество: {item.quantity}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}

            {
                JSON.parse(localStorage.getItem("user_rights")) <= 1 ? (
                    <PhotoPagination />) : (<></>)
            }
        </Center>
    );
}