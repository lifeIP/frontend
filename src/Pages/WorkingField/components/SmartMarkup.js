import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import {
    TransformWrapper,
    TransformComponent,
    useControls
} from "react-zoom-pan-pinch";


import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';


export default function SmartMarkup() {
    const mainRef = useRef(null);
    const [inBoundingBox, setInBoundingBox] = useState(false);
    
    const handleMouseMove = (event) => {
        if (!mainRef.current) return;

        const rect = mainRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;
        
        // console.log(mainRef.current);
        if(!mainRef.current){return}

        if(relativeX > 0 && relativeX < mainRef.current.clientWidth && relativeY > 0 && relativeY < mainRef.current.clientHeight){
            setInBoundingBox(true);
        }
        else{
            setInBoundingBox(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [])



    const CanvasOverImage = ({ currentScale, inBoundingBox }) => {
        const imageRef = useRef(null);
        const canvasRef = useRef(null);

        const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
        const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });
        // const {  } = useControls();


        const handleMouseMove = (event) => {
            if (!canvasRef.current) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const relativeX = event.clientX - rect.left;
            const relativeY = event.clientY - rect.top;

            let x_pos = relativeX / currentScale;
            let y_pos = relativeY / currentScale;

            if(inBoundingBox){
                setMousePosition({ x: x_pos, y: y_pos });
            }
        };








        // Функция для рисования на канвасе
        const drawCanvas = () => {
            if (canvasRef.current) {
                const context = canvasRef.current.getContext('2d');

                const path1 = new Path2D();     // первый путь
                context.lineWidth = 3;
                path1.moveTo(20, 20);
                path1.lineTo(250, 20);

                path1.lineTo(250, 250);
                path1.lineTo(20, 250);
                path1.closePath();    //  закрываем путь
                context.strokeStyle = "blue";
                context.stroke(path1);
            }
        };

        // Эффект для инициализации канваса после рендера
        useEffect(() => {
            drawCanvas();



            // document.addEventListener('mousedown', function (event) {
            //     if (event.button === 0) { // Левая кнопка мыши
            //         leftButtonPressed = true;
            //         console.log('Левая кнопка нажата');
            //     }
            // });

            // document.addEventListener('mouseup', function (event) {
            //     if (leftButtonPressed && event.button === 0) { // Левая кнопка мыши
            //         leftButtonPressed = false;
            //         console.log('Левая кнопка отпущена');
            //     }
            // });



            document.addEventListener('mousemove', handleMouseMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            };
        }, [canvasSize]);

        return (
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                <Card sx={{ width: "51.05vw" }}>
                    <CardMedia
                        ref={imageRef}
                        component="img"
                        onLoad={() => {
                            setCanvasSize({ width: imageRef.current.width, height: imageRef.current.height });
                        }}
                        image={"https://avatars.mds.yandex.net/i?id=f7454bc3badcefdfbef33cfd38fdc121_l-5194719-images-thumbs&n=13"}
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
                <p>x: {mousePosition.x}, y: {mousePosition.y}</p>
                <p>width: {canvasSize.width}, height: {canvasSize.height}</p>
            </Box>
        );
    };

    const [stateEditing, setStateEditing] = useState(true);
    function Actions() {
        return (
            <Box sx={{
                position: 'fixed',  // Закрепляем блок
                left: "76.5%",             // Слева от экрана
                top: "24%",          // Отступ снизу 20 пикселей
                zIndex: 10,          // Убедимся, что блок поверх остальных
                display: "flex",
                justifyContent: "left",
                // height: '12%'
            }}>
                <Card sx={{ borderRadius: "12px" }}>
                    <CardActions >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton onClick={() => {
                                setStateEditing(false);
                            }}><PanToolOutlinedIcon /></IconButton>
                            <IconButton onClick={() => {
                                setStateEditing(true);
                            }}><RectangleOutlinedIcon /></IconButton>
                            <IconButton><OpenInFullOutlinedIcon /></IconButton>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        );
    }


    const [currentScale, setCurrentScale] = React.useState(1);
    return (
        <Card sx={{ width: "51.05vw" }} ref={mainRef}>
            <Box>
                <TransformWrapper
                    disabled={stateEditing}
                    onZoom={(e) => {
                        setCurrentScale(e.state.scale);
                    }}
                >
                    <TransformComponent>
                        <CanvasOverImage currentScale={currentScale} inBoundingBox={inBoundingBox} />
                    </TransformComponent>
                </TransformWrapper>
            </Box>
            <Actions />
        </Card>
    );
}