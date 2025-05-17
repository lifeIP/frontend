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

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

export default function ProjectPage() {
    const navigate = useNavigate()
    const [projectId, setProjectId] = useState(0);

    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);


    const [listImages, setListImages] = useState([]);
    const [listTasks, setListTasks] = useState([]);
    const [unwrap, setUnwrap] = useState(false);


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

    async function getListOfImages(project_id, startIndex) {
        let url = "/get_projects_images_list/" + project_id + "/" + startIndex;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListImages(res.data.ids);
                localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: startIndex, ids: res.data.ids }));
                // console.log(res.data.ids);
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        } catch (err) {
            console.error(err);
            // throw err;
        }
    }


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

    useEffect(() => {
        if (unwrap) {
            getListOfImages(localStorage.getItem("last_project_id"), 1);
        }
    }, [unwrap]);
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
                            isImage={isImage}
                            prjctName={prjctName}
                            prjctDescription={prjctDescription}
                            rows={rows}
                        />
                    </Grid>
                    <Grid size={6}>
                        <ListOfMembers />
                    </Grid>
                </Grid>
            </Box>

            {listTasks.length == 0? (<></>):(
            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Ваши задачи
                    </Typography>
                </CardContent>
                <CardContent>
                    <List disablePadding>
                        {listTasks.map((item) => (
                            <ListItem
                            onClick={()=>{
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

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Фотографии
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fab size="medium" aria-label="добавить фото в проект" onClick={() => { navigate("/upload-images") }}>
                            <AddIcon />
                        </Fab>
                        <Fab size="medium" aria-label="Развернуть список" sx={{ marginLeft: "10px" }} onClick={() => { setUnwrap(!unwrap) }}>
                            {unwrap ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
                        </Fab>
                    </Box>
                </CardContent>
            </Card>
            {unwrap ? (
                <Box sx={{ width: "51.05vw" }}>
                    <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                        {listImages.map((id) => (
                            <Grid size={3}>
                                <ImageViewer image_id={id} setCanvasSize={() => { }} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <></>
            )}
        </Center>
    );
}