import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import { Box, Grid, Typography } from '@mui/material';
import ProjectCardPreview from './components/ProjectCardPreview';
import ProjectCardPreviewSettings from './components/ProjectCardPreviewSettings';
import ProjectMainSetting from "./components/ProjectMainSetting";
import axios from 'axios';
import { useNavigate } from 'react-router';
import settings from "../../../settings.json"

export default function ProjectSettingsPage() {
    const navigate = useNavigate();

    let projectId = 0;
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [isImage, setImage] = useState();
    const [rows, setRows] = useState([]);
    const [imageEvent, setImageEvent] = useState();




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

                res.data.map((item, index) => {
                    list_of_class_name.push({id: index, label: item.class_name, color: item.class_color, description: item.class_description, disabled: true });
                })
                setRows(list_of_class_name);
                // console.log(list_of_class_name);
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

    const sendProjectImage = async (project_id) => {
        if (imageEvent === undefined) return;
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
        let classes = [];
        rows.map((item, index)=>{
            classes.push({
                id: index,
                ...item
            });
        });
        let url = "/update-project-settings/";
        let data = {
            id: JSON.parse(localStorage.getItem("last_project_id")),
            name: prjctName ? prjctName : " ",
            description: prjctDescription ? prjctDescription : " ",
            classes: [...classes],
        }
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.put(`${settings.server.addr}${url}`, data);

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem("last_project_id", res.data.id);
                navigate("/project");
                // console.log('Проект успешно создан!');

            } else {
                // throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(data);
            console.error(err);
            // throw err;
        }
    }


    useEffect(() => {
        projectId = localStorage.getItem("last_project_id");
        if (projectId != 0) {
            getInfoOfProjects();
            getListOfClassesInProject();
            getProjectsPhotoPreviewById();
        }
    }, [projectId])


    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Настройки проекта
                </Typography>
            </Hat>

            <Box sx={{ maxWidth: "51.05vw" }}>
                <Grid container spacing={1} sx={{ maxWidth: "51.05vw" }}>
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
                            createProject={()=>{
                                updateProject();
                                sendProjectImage(JSON.parse(localStorage.getItem("last_project_id")));
                            }}
                            setImage={setImage}
                            setPrjctName={setPrjctName}
                            setPrjctDescription={setPrjctDescription}
                            prjctName={prjctName}
                            prjctDescription={prjctDescription}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <ProjectMainSetting rows={rows} setRows={setRows} />
            </Box>
        </Center>
    );
}