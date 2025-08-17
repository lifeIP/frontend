import { Box, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import markUpStore from "./store/store";
import {
    TransformWrapper,
    TransformComponent,
    useControls,
    useTransformEffect,
    useTransformContext
} from "react-zoom-pan-pinch";
import Actions from './Actions/Actions';

function MarkUpPage() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [resizedFlag, setResizedFlag] = useState(false);

    const [stateEditing, setStateEditing] = useState(true);
    const [isActive, setIsActive] = useState(false);


    let mouse_pos_x = -1;
    let mouse_pos_y = -1;

    /*Отслеживание перемещений мыши*/
    function handleMouseMove(event) {
        const rect = canvasRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        mouse_pos_x = relativeX;
        mouse_pos_y = relativeY;
        drawCanvas(!stateEditing);
    };

    function handleMouseButtonPressed(event) {
        
        // Нажата левая кнопка мыши
        if (event.button === 0){

            // Курсор мыши должен находиться внутри фотографии
            if(inBox()){
                markUpStore.addPoligonPoint(mouse_pos_x, mouse_pos_y);
            }
        }
    }

    function handleMouseButtonReleased(event) {

    }

    function handleResize() {
        console.log("resized");
        setResizedFlag(true);
    };

    function handleWheelScroll(event) {
        console.log(event.deltaY);
    }

    function drawCanvas(isEdit) {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.lineWidth = 1.8;

        
            drawCordinateRuler(context);
            drawNewPoligon(context);
        

            // Рисование линий для более удобной навигации по фотографии(крестик)
            function drawCordinateRuler(context){
                const path1 = new Path2D();
                context.strokeStyle = "#000000";

                path1.moveTo(mouse_pos_x, 0);
                path1.lineTo(mouse_pos_x, canvasRef.current.height);
                path1.moveTo(0, mouse_pos_y);
                path1.lineTo(canvasRef.current.width, mouse_pos_y);

                path1.closePath();
                context.stroke(path1);
            }

            function drawNewPoligon(context){
                const path1 = new Path2D();
                context.strokeStyle = "#4aff02ff";
                markUpStore.poligon_points.map((point, index) => {
                    if (index == 0) {
                        path1.moveTo(point.x, point.y);
                    }
                    path1.lineTo(point.x, point.y);
                    path1.moveTo(point.x, point.y);
                    context.fillRect(point.x - 3, point.y - 3, 6, 6);
                })
                if (mouse_pos_x > 0 || mouse_pos_y > 0) {
                    path1.lineTo(mouse_pos_x, mouse_pos_y);
                    path1.moveTo(mouse_pos_x, mouse_pos_y);
                    context.fillRect(mouse_pos_x - 3, mouse_pos_y - 3, 6, 6);
                }
                path1.closePath();
                context.stroke(path1);
            }
        }
    };

    function inBox() {
        const rect = imageRef.current.getBoundingClientRect()

        if(rect.left > mouse_pos_x){
            return false;
        }
        if(rect.top > mouse_pos_y){
            return false;
        }
        if(rect.right < mouse_pos_x){
            return false;
        }
        if(rect.bottom < mouse_pos_y){
            return false;
        }
        return true;
    }



    useEffect(() => {
        if(resizedFlag){
            setResizedFlag(false);
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseButtonReleased);
        document.addEventListener('mousedown', handleMouseButtonPressed);
        document.addEventListener('resize', handleResize);
        document.addEventListener('wheel', handleWheelScroll);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseButtonReleased);
            document.removeEventListener('mousedown', handleMouseButtonPressed);
            document.removeEventListener('resize', handleResize);
            // document.removeEventListener('wheel', handleWheelScroll);
        };
    }, [resizedFlag]);

    

    const activeStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Отменяем события мыши для канваса
        zIndex: 15,
    };

    return <>
        <Box sx={{
            position: 'absolute',
            width: "100vw",
            height: "100vh",
            background: "#000000"
        }}>
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
                        setEdit={() => {}}
                        setStateEditing={(flag) => {
                            setStateEditing(flag);
                        }}
                        setMaskType={() => {}}
                    />
                </Box>
            </Box>

            <TransformWrapper
                disabled={stateEditing}
            >
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
                                    ref={imageRef}
                                    component="img"
                                    src='https://avatars.mds.yandex.net/i?id=7396ac3ba788305bacfed2318fba8ca3_l-5267277-images-thumbs&n=13'
                                    alt="Фотография"
                                    sx={{
                                        width: '100%',   // Ширина фотографии — 100% ширины контейнера
                                        maxHeight: '100%',
                                        height: 'auto',  // Высота автоматически адаптируется под ширину
                                        width: 'auto',
                                        objectFit: 'contain',  // Подгоняем картинку без искажений
                                        display: 'block',
                                        margin: '0 auto'  // Центрируем изображение горизонтально
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </TransformComponent>
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={activeStyles}
                />
            </TransformWrapper>
        </Box>
    </>
}

export default observer(MarkUpPage);