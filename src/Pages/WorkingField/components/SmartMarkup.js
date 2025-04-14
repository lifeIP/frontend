import settings from "../../../settings.json"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography
} from '@mui/material';

import React, {
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



export default function SmartMarkup({project_id}) {
    const mainRef = useRef(null);
    const [inBoundingBox, setInBoundingBox] = useState(false);

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

    useEffect(() => {
        localStorage.setItem('rect_list', JSON.stringify([]));
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [])



    const CanvasOverImage = ({ currentClass, currentScale, inBoundingBox, stateEditing }) => {
        const imageRef = useRef(null);
        const canvasRef = useRef(null);

        const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
        let mouse_pos_x = -1;
        let mouse_pos_y = -1;

        const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });


        let rect_pos_x = 0;
        let rect_pos_y = 0;
        let rect_shape_w = 0;
        let rect_shape_h = 0;
        let rect_class_c = "#00FF00";
        let rect_list = [];

        // Функция для рисования на канвасе
        const drawCanvas = () => {
            if (canvasRef.current) {
                const context = canvasRef.current.getContext('2d');

                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.lineWidth = 3;

                if (rect_list.length === 0) {
                    rect_list = JSON.parse(localStorage.getItem('rect_list'))
                }
                rect_list.map((item, index) => {
                    const path1 = new Path2D();
                    // path1.strokeStyle = item.c;
                    context.strokeStyle = item.c.class_color;
                    path1.rect(
                        item.x, item.y,
                        item.w, item.h
                    );
                    path1.closePath();
                    context.stroke(path1);
                })

                const path1 = new Path2D();
                context.strokeStyle = currentClass.class_color;
                path1.rect(rect_pos_x, rect_pos_y, rect_shape_w, rect_shape_h)
                path1.closePath();    //  закрываем путь
                context.stroke(path1);
            }
        };



        let leftButtonPressed = false;
        const handleMouseMove = (event) => {
            if (!inBoundingBox || !stateEditing) { return }

            if (leftButtonPressed) {
                console.log('Левая кнопка зажата');
                rect_shape_w = mouse_pos_x - rect_pos_x;
                rect_shape_h = mouse_pos_y - rect_pos_y;
                drawCanvas();
            }

            if (!canvasRef.current) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const relativeX = event.clientX - rect.left;
            const relativeY = event.clientY - rect.top;

            let x_pos = relativeX / currentScale;
            let y_pos = relativeY / currentScale;

            setMousePosition({ x: x_pos, y: y_pos });
            mouse_pos_x = x_pos;
            mouse_pos_y = y_pos;
        };

        function handleLeftButtonPressed(event) {
            if (!inBoundingBox || !stateEditing) { return }
            if (event.button === 0) { // Левая кнопка мыши
                leftButtonPressed = true;
                console.log('Левая кнопка нажата');
                rect_pos_x = mouse_pos_x;
                rect_pos_y = mouse_pos_y;
            }
        };

        const handleLeftButtonReleased = (event) => {
            if (!inBoundingBox || !stateEditing) { return }
            if (leftButtonPressed && event.button === 0) { // Левая кнопка мыши
                leftButtonPressed = false;
                console.log('Левая кнопка отпущена');

                rect_class_c = currentClass.class_color;
                rect_list.push({
                    x: rect_pos_x,
                    y: rect_pos_y,
                    w: rect_shape_w,
                    h: rect_shape_h,
                    c: currentClass
                })
                localStorage.setItem('rect_list', JSON.stringify(rect_list));
                // handleClickOpen({
                //     x: rect_pos_x,
                //     y: rect_pos_y,
                //     w: rect_shape_w,
                //     h: rect_shape_h
                // });
            }
        };





        // Эффект для инициализации канваса после рендера
        useEffect(() => {
            drawCanvas();

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleLeftButtonReleased);
            document.addEventListener('mousedown', handleLeftButtonPressed);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleLeftButtonReleased);
                document.removeEventListener('mousedown', handleLeftButtonPressed);
            };
        }, [canvasSize]);

        return (
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                <Card sx={{ width: "51.05vw" }}>
                    <CardMedia
                        ref={imageRef}
                        component="img"
                        onLoad={() => {
                            setCanvasSize({
                                width: imageRef.current.width,
                                height: imageRef.current.height
                            });
                        }}
                        image=
                        {"https://avatars.mds.yandex.net/i?id=f7454bc3badcefdfbef33cfd38fdc121_l-5194719-images-thumbs&n=13"}
                        alt="Фотография"
                        sx={{
                            width: '100%',   // Ширина фотографии — 100% ширины контейнера
                            height: 'auto',  // Высота автоматически адаптируется под ширину
                            objectFit: 'contain',  // Подгоняем картинку без искажений
                            display: 'block',
                            margin: '0 auto'  // Центрируем изображение горизонтально
                        }}
                    />
                </Card>

                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 15,
                    }}
                />
                {/* <p>x: {mousePosition.x}, y: {mousePosition.y}</p>
                <p>width: {canvasSize.width}, height: {canvasSize.height}</p> */}
            </Box>
        );
    };



    // const data_markup_classes = [
    //     {
    //         id: 0,
    //         class_name: "eyes",
    //         class_color: "#FF0000"
    //     },
    //     {
    //         id: 1,
    //         class_name: "lip",
    //         class_color: "#0000FF"
    //     },
    //     {
    //         id: 2,
    //         class_name: "hair",
    //         class_color: "#00FF00"
    //     },
    // ];
    const [data_markup_classes, setDataMarkupClasses] = useState([{
        id: -1,
        class_name: "item",
        class_color: "#FF0000"
    }]);
    // Загрузка информации о проекте
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + project_id)
            .then(res => {
                setDataMarkupClasses(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const [stateEditing, setStateEditing] = useState(true);
    const [currentScale, setCurrentScale] = useState(1);
    const [selectedClass, setSelectedClass] = useState(0);
    return (
        <Card sx={{ width: "51.05vw" }} ref={mainRef}>
            <Box>
                <TransformWrapper
                    disabled={stateEditing}
                    onTransformed={(e) => {
                        setCurrentScale(e.state.scale);
                    }}
                >
                    <TransformComponent>
                        <CanvasOverImage
                            currentClass={data_markup_classes.at(selectedClass)}
                            currentScale={currentScale}
                            inBoundingBox={inBoundingBox}
                            stateEditing={stateEditing} />
                    </TransformComponent>
                </TransformWrapper>
            </Box>
            <Actions setStateEditing={setStateEditing} />
            <ClassesList
                selectedClass={selectedClass}
                data_markup_classes={data_markup_classes}
                setSelectedClass={setSelectedClass} />
        </Card>
    );
}