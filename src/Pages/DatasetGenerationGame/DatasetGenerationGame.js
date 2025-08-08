import { Box, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";
import Actions from './Actions/Actions';

export default function DatasetGenerationGame() {
    const canvasRef = useRef(null);

    const [stateEditing, setStateEditing] = useState(true);
    const [currentScale, setCurrentScale] = useState(1.0);
    const [isActive, setIsActive] = useState(false);


    let mouse_pos_x = -1;
    let mouse_pos_y = -1;

    const handleMouseMove = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        mouse_pos_x = relativeX;
        mouse_pos_y = relativeY;
        
        drawCanvas(!stateEditing);
    };


    const drawCanvas = (isEdit) => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.lineWidth = 1.8;

            if (isEdit){
                return;
            }
            const path1 = new Path2D();
            context.strokeStyle = "#000000";

            path1.moveTo(mouse_pos_x, 0);
            path1.lineTo(mouse_pos_x, canvasRef.current.height);
            path1.moveTo(0, mouse_pos_y);
            path1.lineTo(canvasRef.current.width, mouse_pos_y);

            path1.closePath();
            context.stroke(path1);
        }
    };


    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
    });

    const activeStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 15,
    };
    const inactiveStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    };

    return <>
        <Box sx={{
            position: 'absolute',
            width: "100vw",
            height: "100vh",
            background: "#000000"
        }}
        >

            <Box sx={{
                position: 'absolute',
                width: '100vw',
                bottom: "5px",
                zIndex: 18,
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Actions
                        setEdit={() => { }}
                        setStateEditing={(flag)=>{
                            setStateEditing(flag);
                            setIsActive(flag);
                        }}
                        setMaskType={() => { }}
                    />
                </Box>
            </Box>

            <TransformWrapper
                onTransformed={(e) => {
                    setCurrentScale(e.state.scale);
                }}
                disabled={stateEditing}
            >
                <canvas
                    disabled={!stateEditing}
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={isActive ? activeStyles : inactiveStyles}
                />
                <TransformComponent>
                    <Box sx={{
                        width: "100vw",
                        height: "100vh",
                        background: "#d3cacaff"
                    }}>
                        <Box sx={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Box sx={{
                                width: "70%",
                                height: "70%"
                            }}>
                                <CardMedia
                                    component="img"
                                    src='https://avatars.mds.yandex.net/i?id=7396ac3ba788305bacfed2318fba8ca3_l-5267277-images-thumbs&n=13'
                                    alt="Фотография"
                                    sx={{
                                        width: '100%',   // Ширина фотографии — 100% ширины контейнера
                                        maxHeight: '100%',
                                        height: 'auto',  // Высота автоматически адаптируется под ширину
                                        objectFit: 'contain',  // Подгоняем картинку без искажений
                                        display: 'block',
                                        margin: '0 auto'  // Центрируем изображение горизонтально
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </TransformComponent>
            </TransformWrapper>
        </Box>
    </>
}