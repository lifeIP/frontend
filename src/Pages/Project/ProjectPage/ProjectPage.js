import { Box, Card, CardContent, Fab, Grid, Typography } from '@mui/material';
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


export default function ProjectPage() {
    const navigate = useNavigate()
    const [projectId, setProjectId] = useState(0);

    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);


    const [listImages, setListImages] = useState([]);


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
                localStorage.setItem("list_of_ids_images", JSON.stringify({startIndex: startIndex, ids: res.data.ids}));
                // console.log(res.data.ids);
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        } catch (err) {
            console.error(err);
            // throw err;
        }
    }

    useEffect(() => {
        setProjectId(localStorage.getItem("last_project_id"));
        getListOfImages(localStorage.getItem("last_project_id"), 1);
    }, []);

    useEffect(()=>{
        if (projectId!=0){
            getInfoOfProjects();
            getListOfClassesInProject();
            getProjectsPhotoPreviewById();
        }
    }, [projectId])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проект
                </Typography>
            </Hat>

            <Box sx={{maxWidth: "51.05vw"}}>
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
                    <ListOfMembers/>
                </Grid>
            </Grid>
            </Box>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Фотографии
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fab size="medium" aria-label="добавить проект" onClick={() => { navigate("/upload-images") }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </CardContent>

            </Card>

            <Box sx={{ width: "51.05vw" }}>
                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                    {listImages.map((id) => (
                        <Grid size={3}>
                            {/* <Box sx={{maxHeight: "15vw"}}> */}
                            <ImageViewer image_id={id} setCanvasSize={() => { }} />
                            {/* </Box> */}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
}