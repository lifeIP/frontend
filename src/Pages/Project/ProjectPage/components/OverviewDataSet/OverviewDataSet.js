import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, CardMedia, Fab, Grid, Icon, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router";

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AddIcon from '@mui/icons-material/Add';
import settings from '../../../../../settings.json'


import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import ListDatasetVersion from './ListDatasetVersion';

const ImageViewer = ({ image_id }) => {
    const navigate = useNavigate();

    const [imagePurpose, setImagePurpose] = useState(0);

    const imageRef = useRef(null);
    const [image, setImage] = useState();

    async function getImagePurpose() {
        let url = "/get_image_purpose/" + image_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setImagePurpose(res.data.purpose)
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        } catch (err) {
            console.error(err);
            // throw err;
        }
    }

    useEffect(() => {
        imageRef.current.src = null
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${image_id}?t=${Date.now()}`, {
            responseType: "arraybuffer"
        })
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setImage(`data:image/jpeg;charset=utf-8;base64,${base64}`);
            })
            .catch(err => {
                console.log(err);
            })

    }, [image_id]);

    useEffect(() => {
        getImagePurpose();
    }, []);

    return (
        <Box position="relative">
            <Card>
                <CardActionArea
                    onClick={() => {
                        localStorage.setItem("working-field-image-id", image_id);
                        navigate("/working-field");
                    }}
                >
                    <CardMedia
                        key={image}
                        ref={imageRef}
                        component="img"

                        src={image}
                        alt="Фотография"
                        sx={{
                            width: '100%',
                            height: '20vh',
                            objectFit: "contain",
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </CardActionArea>
                <Box position="absolute" top="8px" right="8px">
                    {imagePurpose == 1 ? (<Icon sx={{ color: "#7cfc00" }}><SchoolOutlinedIcon /></Icon>) : (<></>)}
                    {imagePurpose == 2 ? (<Icon sx={{ color: "#00008b" }}><BiotechOutlinedIcon /></Icon>) : (<></>)}
                    {imagePurpose == 3 ? (<Icon sx={{ color: "#f3da0b" }}><RuleOutlinedIcon /></Icon>) : (<></>)}
                </Box>
            </Card>
        </Box>
    );
}


export default function OverviewDataSet() {
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [listImages, setListImages] = useState([]);

    const [value, setValue] = React.useState(0);
    // Обработчик изменения активной вкладки
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getListOfImages(project_id, startIndex) {
        if (startIndex == 0) return;
        let url = "/get_projects_dataset_images_list/" + project_id + "/" + startIndex;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListImages(res.data.ids);
                setTotalPhotos(res.data.total_images_count)
                localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: startIndex, ids: res.data.ids }));
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getListOfImages(localStorage.getItem("last_project_id"), 1);
        
    }, []);
    const photosPerPage = 50;
    const pagesCount = Math.ceil(totalPhotos / photosPerPage) + 1; // Всего страниц

    const [currentPage, setCurrentPage] = useState(1); // Текущая страница

    // Перемещаемся на следующую страницу
    const nextPage = () => {
        if (currentPage < pagesCount) {
            getListOfImages(localStorage.getItem('last_project_id'), currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };

    // Перемещаемся на предыдущую страницу
    const previousPage = () => {
        if (currentPage - 1 > 0) {
            getListOfImages(localStorage.getItem('last_project_id'), currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    // Форматируем номер страницы кратно 50
    const startPhotoNumber = currentPage * photosPerPage - 50 + 1;
    return (<>
        {
            JSON.parse(localStorage.getItem("user_rights")) <= 1 ? (
                <>
                    <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" textAlign="center">
                                Набор данных
                            </Typography>
                        </CardContent>
                    </Card>
                    <>
                        <Card sx={{ width: "51.05vw", marginTop: '1.85vh' }}>
                            <Box alignItems="center" justifyContent="center" display="flex">
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Версии набора данных" variant="" />
                                    <Tab label="Исходные данные" />
                                </Tabs>
                            </Box>
                        </Card>
                        {value == 0 ? (<>
                        <ListDatasetVersion/>
                        </>) : (<></>)}
                        {value == 1 ? (<>
                            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CardContent>
                                    <ButtonGroup variant="contained" color="primary" aria-label="pagination buttons group">
                                        <Button disabled={currentPage <= 1} onClick={previousPage}>Назад</Button>
                                        <Button disabled={currentPage >= pagesCount - 1} onClick={nextPage}>Вперед</Button>
                                    </ButtonGroup>
                                </CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Фото: {startPhotoNumber}/{startPhotoNumber + JSON.parse(localStorage.getItem("list_of_ids_images")).ids.length - 2} из {totalPhotos}
                                </Typography>

                            </Card>
                            <Box sx={{ width: "51.05vw" }}>
                                <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                                    {listImages.map((id) => (
                                        <Grid size={3}>
                                            <ImageViewer image_id={id} setCanvasSize={() => { }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CardContent>
                                    <ButtonGroup variant="contained" color="primary" aria-label="pagination buttons group">
                                        <Button disabled={currentPage <= 1} onClick={previousPage}>Назад</Button>
                                        <Button disabled={currentPage >= pagesCount - 1} onClick={nextPage}>Вперед</Button>
                                    </ButtonGroup>
                                </CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Фото: {startPhotoNumber}/{startPhotoNumber + JSON.parse(localStorage.getItem("list_of_ids_images")).ids.length - 2} из {totalPhotos}
                                </Typography>
                            </Card>
                        </>) : (<></>)}
                    </>
                </>) : (<></>)
        }
    </>);
}