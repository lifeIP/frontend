import settings from "../../../../settings.json"
import {
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

import React, {
    memo,
    useEffect,
    useRef,
    useState
} from 'react';

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

import Actions from './Actions';
import ClassesList from './ClassesList';
import axios from 'axios';
import ImageViewer from "./ImageViewer";
import CanvasOverImage from "./CanvasOverImage";
import PhotoPagination from "./PhotoPagination";
import PhotoMarkedUpPagination from "./PhotoMarkedUpPagination";
import TaskManagement from "./TaskManagement/TaskManagement";
import { useNavigate } from "react-router";




export default function SmartMarkup({ project_id, taskId }) {
    const navigate = useNavigate();
    const mainRef = useRef(null);
    const [inBoundingBox, setInBoundingBox] = useState(true);



    function useKey(key, cb) {
        const callback = useRef(cb);

        useEffect(() => {
            callback.current = cb;
        })


        useEffect(() => {
            function handle(event) {
                // console.log(event.code);
                if (event.code === key) {
                    callback.current(event);
                } else if (key === 's' && event.key === 's') {
                    callback.current(event);
                } else if (key === 'a' && event.key === 'a') {
                    callback.current(event);
                } else if (key === 'd' && event.key === 'd') {
                    callback.current(event);
                } else if (key === 'e' && event.key === 'e') {
                    callback.current(event);
                }
                else if (key === 'ShiftLeft' && event.key === 'ShiftLeft') {
                    callback.current(event);
                }
                else if (key === 'ControlLeft' && event.key === 'ControlLeft') {
                    callback.current(event);
                }
            }

            document.addEventListener('keydown', handle);
            return () => document.removeEventListener("keydown", handle)
        }, [key])
    }

    const handleMouseMove = (event) => {
        if (!mainRef.current) return;

        const rect = mainRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        if (relativeX > 0 && relativeX < mainRef.current.clientWidth
            && relativeY > 0 && relativeY < mainRef.current.clientHeight) {
            setInBoundingBox(true);
        }
        else {
            setInBoundingBox(false);
        }
    };

    async function saveMask() {
        console.log('S fired!');

        let url = "/set_mask_on_image/" + localStorage.getItem("working-field-image-id");
        let data = {
            forms: JSON.parse(localStorage.getItem('rect_list')),
        }
        console.log(data);

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, data);

            if (res.status === 200 || res.status === 201) {
                // console.log(res.data);
                // sendProjectImage(res.data.id);
                // localStorage.setItem("last_project_id", res.data.id);
                // console.log('Проект успешно создан!');

            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(data);
            console.error(err);
            throw err;
        }
    }

    useKey('s', () => saveMask());
    useKey('a', () => leftButtonClicked());
    useKey('d', () => rightButtonClicked());

    const [edit, setEdit] = useState(false);
    useKey('e', () => {
        setEdit(true);
    });
    useKey('ShiftLeft', () => {
        setStateEditing(true);
    });
    useKey('ControlLeft', () => {
        setStateEditing(false);
    });


    useEffect(() => {

        localStorage.setItem('rect_list', JSON.stringify([]));
        localStorage.setItem('poligon_points_list', JSON.stringify([]));

        localStorage.setItem("now_is_last_list", false);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [])


    function loadImageById() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${localStorage.getItem("working-field-image-id")}?t=${Date.now()}`, {
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
    }
    useEffect(() => {
        loadImageById();
    }, [taskId])


    const [data_markup_classes, setDataMarkupClasses] = useState([{
        id: -1,
        class_name: "item",
        class_color: "#FF0000"
    }]);
    // Загрузка информации о проекте
    useEffect(() => {
        if (project_id === 0) return
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + project_id)
            .then(res => {
                setDataMarkupClasses(res.data);
                // console.log(res.data);
            })
            .catch(err => {
                // console.log(err);
            })

    }, [project_id])

    const [stateEditing, setStateEditing] = useState(true);
    const [currentScale, setCurrentScale] = useState(1);
    const [selectedClass, setSelectedClass] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });
    const [isSaved, setSaved] = useState(false);

    const [image, setImage] = useState("https://orthomoda.ru/bitrix/templates/.default/img/no-photo.jpg");
    const [isLoaded, setIsLoaded] = useState(false);

    const [imageId, setImageId] = useState(-1);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${localStorage.getItem("working-field-image-id")}?t=${Date.now()}`, {
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
                // setImageId(imageId);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [imageId]);
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${localStorage.getItem("working-field-image-id")}?t=${Date.now()}`, {
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
                // setImageId(imageId);
                setIsLoaded(true);

            })
            .catch(err => {
                console.log(err);
            })
    }, [taskId]);

    const CanvasOverImageComponent = memo(({ maskType, edit, data_markup_classes, currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, isSaved, setSaved }) => {
        return <CanvasOverImage
            maskType={maskType}
            data_markup_classes={data_markup_classes}
            currentClass={currentClass}
            currentScale={currentScale}
            inBoundingBox={inBoundingBox}
            stateEditing={stateEditing}
            edit={edit}
            canvasSize={canvasSize}
            setSaved={setSaved}
            isSaved={isSaved}
        />
    });

    const [value, setValue] = React.useState(0);

    // Обработчик изменения активной вкладки
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getListOfImages(taskId, startIndex) {
        let url = "/get_task_images_list/" + taskId + "/" + startIndex;
        if(value==0){
            url = "/get_task_images_not_marked_up_list/" + taskId + "/" + startIndex;
        }
        else if(value==1){
            url = "/get_task_images_marked_up_list/" + taskId + "/" + startIndex;
        }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}${url}`).then((res) => {

            if (res.status === 200 || res.status === 201) {
                // setListImages(res.data.ids);
                console.log(res.data);
                if (res.data.ids.length != 0) {
                    localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: startIndex, ids: res.data.ids }));
                }
                console.log(res.data.ids);
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    function rightButtonClicked() {
        const list_of_ids_images = JSON.parse(localStorage.getItem("list_of_ids_images"));
        const working_field_image_id = JSON.parse(localStorage.getItem("working-field-image-id"));
        let index_now = list_of_ids_images.ids.indexOf(working_field_image_id);
        if (!JSON.parse(localStorage.getItem("task_flag")) && index_now == 0) {
            index_now = -1;
            localStorage.setItem("task_flag", true);
            setIsLoaded(false);
        }
        if (list_of_ids_images.ids.length - 1 > index_now) {
            localStorage.setItem("working-field-image-id", list_of_ids_images.ids[index_now + 1])
            localStorage.setItem('rect_list', JSON.stringify([]));
            localStorage.setItem('poligon_points_list', JSON.stringify([]));
            setImageId(imageId + 1);
            return
        }
        getListOfImages(taskId, list_of_ids_images.startIndex + 1);
    }
    function leftButtonClicked() {
        const list_of_ids_images = JSON.parse(localStorage.getItem("list_of_ids_images"));
        const working_field_image_id = JSON.parse(localStorage.getItem("working-field-image-id"));
        let index_now = list_of_ids_images.ids.indexOf(working_field_image_id);
        if (JSON.parse(localStorage.getItem("task_flag")) && index_now == 0) {
            localStorage.setItem("task_flag", true);
            setIsLoaded(false);
        }

        if (index_now == -1) {
            index_now = 49;
        }
        console.log(index_now);
        if (index_now > 0) {
            localStorage.setItem("working-field-image-id", list_of_ids_images.ids[index_now - 1])
            localStorage.setItem('rect_list', JSON.stringify([]));
            localStorage.setItem('poligon_points_list', JSON.stringify([]));
            setImageId(imageId - 1);
            localStorage.setItem("task_flag", true);
            return;
        }
        if (list_of_ids_images.startIndex - 1 < 1) {
            // getListOfImages(taskId, 1);
            localStorage.setItem("task_flag", false);
            // setImageId(1);
            return;
        }
        getListOfImages(taskId, list_of_ids_images.startIndex - 1);
    }

    const [maskType, setMaskType] = useState(0);
    return (
        <>
            <Card sx={{ width: "51.05vw" }} ref={mainRef}>
                <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>

                    <TransformWrapper
                        disabled={stateEditing}
                        onTransformed={(e) => {
                            setCurrentScale(e.state.scale);
                        }}
                    >
                        <TransformComponent>
                            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                                <Card sx={{ width: "51.05vw" }}>
                                    <ImageViewer setCanvasSize={setCanvasSize} image={image} isLoaded={isLoaded} />
                                    <CanvasOverImageComponent
                                        maskType={maskType}
                                        edit={edit}
                                        data_markup_classes={data_markup_classes}
                                        currentClass={data_markup_classes.at(selectedClass)}
                                        currentScale={currentScale}
                                        inBoundingBox={inBoundingBox}
                                        canvasSize={canvasSize}
                                        stateEditing={stateEditing}
                                        setSaved={setSaved}
                                        isSaved={isSaved} />

                                </Card>
                            </Box>
                        </TransformComponent>
                    </TransformWrapper>
                </Box>
                <Actions
                    setMaskType={setMaskType}
                    setEdit={setEdit}
                    setStateEditing={setStateEditing}
                    onLeftButtonClicked={() => {
                        // console.log("left")
                        leftButtonClicked();
                    }}
                    onRightButtonClicked={() => {
                        // console.log("right")
                        rightButtonClicked();
                    }}
                    onFullscreenButtonCliked={()=>{
                        navigate("/markup_fullscreen");
                    }}
                />
                <ClassesList
                    selectedClass={selectedClass}
                    data_markup_classes={data_markup_classes}
                    setSelectedClass={setSelectedClass} />
            </Card>
            <Card sx={{ width: "51.05vw" }}>
                <Box alignItems="center" justifyContent="center" display="flex">
                    <Tabs value={value} onChange={handleChange}>
                        {/* Первая кнопка-текст занимает ровно половину пространства */}
                        <Tab label="Не размеченные" variant="" />
                        {/* Вторая кнопка-текст также занимает ровно половину пространства */}
                        <Tab label="Размеченные" />
                        <Tab label="Информация" />
                        <Tab label="Управление" />
                    </Tabs>
                </Box>
            </Card>

            {value == 0 ? (<PhotoPagination setImageId={setImageId} setIsLoaded={setIsLoaded} />) :
                (<></>)
            }
            {value == 1 ? (<PhotoMarkedUpPagination setImageId={setImageId} setIsLoaded={setIsLoaded} />) :
                (<></>)
            }
            {value == 2 ? (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: '1.85vh'
                }}>
                    <Card sx={{
                        borderRadius: "12px",
                        width: "51.05vw",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                    }}>
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" textAlign="center" fontWeight="bold">
                                Информация
                            </Typography>
                            <List dense disablePadding>
                                <ListItemText primary={<Typography>Ctrl — Включить режим зума</Typography>} />
                                <ListItemText primary={<Typography>Shift — Включить режим разметки (квадрат)</Typography>} />
                                <ListItemText primary={<Typography>S — Сохранить изменения</Typography>} />
                                <ListItemText primary={<Typography>A — Предыдущая фотография</Typography>} />
                                <ListItemText primary={<Typography>D — Следующая фотография</Typography>} />
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            ) :
                (<></>)
            }
            {value == 3 ? (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: '1.85vh'
                }}>
                    <TaskManagement />
                </Box>
            ) :
                (<></>)
            }
        </>
    );
}