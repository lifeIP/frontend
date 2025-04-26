import { Box, Card, CardContent, Fab, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectCardPreview from '../CreateProject/components/ProjectCardPreview';
import ImageViewer from './components/ImageViewer'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import axios from 'axios';
import settings from "../../../settings.json"


export default function ProjectPage() {
    const navigate = useNavigate()
    const [projectId, setProjectId] = useState(0);

    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);


    const [listImages, setListImages] = useState([]);

    async function getListOfImages(project_id) {
        let url = "/get_projects_images_list/" + project_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListImages(res.data.ids);
                console.log(res.data.ids);
            } else {
                throw new Error('Ошибка при отправке данных');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        setProjectId(localStorage.getItem("last_project_id"));
        getListOfImages(localStorage.getItem("last_project_id"));
    }, []);

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проект {projectId}
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
            </Grid>

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
                    {listImages.map((id)=>(
                        <Grid size={3}>
                        <ImageViewer image_id={id} setCanvasSize={() => { }} />
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
}