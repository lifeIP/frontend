import { Box, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import markUpStore from "./store/store";
import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";
import Actions from './Actions/Actions';
import ClassesList from './ClassList/ClassesList';

function MarkUpPage() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [resizedFlag, setResizedFlag] = useState(false);


    const [currentScale, setCurrentScale] = useState(1);
    const [currentPositionOffsetX, setCurrentPositionOffsetX] = useState(0);
    const [currentPositionOffsetY, setCurrentPositionOffsetY] = useState(0);
    const [selectedClass, setSelectedClass] = useState(0);


    let mouse_pos_x = -1;
    let mouse_pos_y = -1;

    /*Отслеживание перемещений мыши*/
    function handleMouseMove(event) {
        const rect = canvasRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        mouse_pos_x = relativeX;
        mouse_pos_y = relativeY;

        drawCanvas();
    };

    function handleMouseButtonPressed(event) {

        // Нажата левая кнопка мыши
        if (event.button === 0) {

            // Курсор мыши должен находиться внутри фотографии
            //console.log(!markUpStore.stateShiftPressed);
            if (inBox() && !markUpStore.stateShiftPressed) {
                if (mouse_pos_x == -1 || mouse_pos_y == -1) return;
                if (markUpStore.poligon_points.length == 0) {
                    // markUpStore.initNewPoligon(
                    // 
                    // );
                    // TODO: Надо добавить
                }
                markUpStore.addPoligonPoint(
                    (mouse_pos_x - currentPositionOffsetX) / currentScale,
                    (mouse_pos_y - currentPositionOffsetY) / currentScale
                );
            }
        }
    }

    function handleMouseButtonReleased(event) {
        if (event.button === 0) {

        }
    }

    function handleResize() {
        //console.log("resized");
        setResizedFlag(true);
    };


    function drawCanvas() {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.lineWidth = 1.8;


            if (!markUpStore.stateShiftPressed) drawCordinateRuler(context);
            drawNewPoligon(context);
            drawAllPoligons(context);


            // Рисование линий для более удобной навигации по фотографии(крестик)
            function drawCordinateRuler(context) {
                const path1 = new Path2D();
                context.strokeStyle = "#000000";

                path1.moveTo(mouse_pos_x, 0);
                path1.lineTo(mouse_pos_x, canvasRef.current.height);
                path1.moveTo(0, mouse_pos_y);
                path1.lineTo(canvasRef.current.width, mouse_pos_y);

                path1.closePath();
                context.stroke(path1);
            }

            function drawNewPoligon(context) {
                const path1 = new Path2D();
                context.strokeStyle = markUpStore.class_color;
                markUpStore.poligon_points.map((point, index) => {
                    if (index == 0) {
                        path1.moveTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                    }
                    path1.lineTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                    path1.moveTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                    context.fillRect(point.x * currentScale + currentPositionOffsetX - 3, point.y * currentScale + currentPositionOffsetY - 3, 6, 6);
                })
                if (mouse_pos_x > 0 || mouse_pos_y > 0) {
                    path1.lineTo(mouse_pos_x, mouse_pos_y);
                    path1.moveTo(mouse_pos_x, mouse_pos_y);
                    context.fillRect(mouse_pos_x - 3, mouse_pos_y - 3, 6, 6);
                }
                path1.closePath();
                context.stroke(path1);
            }

            function drawAllPoligons(context) {
                markUpStore.rect_list.map((item) => {
                    const path1 = new Path2D();
                    context.strokeStyle = item.class_color;
                    item.points.map((point, index) => {
                        if (index == 0) {
                            path1.moveTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                        }
                        path1.lineTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                        path1.moveTo(point.x * currentScale + currentPositionOffsetX, point.y * currentScale + currentPositionOffsetY);
                        context.fillRect(point.x * currentScale + currentPositionOffsetX - 3, point.y * currentScale + currentPositionOffsetY - 3, 6, 6);
                        if (index == item.points.length - 1) {
                            path1.lineTo(item.points[0].x * currentScale + currentPositionOffsetX, item.points[0].y * currentScale + currentPositionOffsetY);
                        }
                    })
                    path1.closePath();
                    context.stroke(path1);
                });
            }
        }
    }


    function inBox() {
        const rect = imageRef.current.getBoundingClientRect()

        if (rect.left > mouse_pos_x) {
            return false;
        }
        if (rect.top > mouse_pos_y) {
            return false;
        }
        if (rect.right < mouse_pos_x) {
            return false;
        }
        if (rect.bottom < mouse_pos_y) {
            return false;
        }
        return true;
    }



    let lastRightClickTime = 0;
    const DOUBLE_CLICK_THRESHOLD = 500;
    function handleContextMenu(event) {
        event.preventDefault();

        const now = Date.now();
        if (now - lastRightClickTime <= DOUBLE_CLICK_THRESHOLD) {
            // Произошёл двойной клик правой кнопкой мыши
            handleDoubleRightClick(event);
        }

        lastRightClickTime = now;
    }

    function handleDoubleRightClick(event) {
        //console.log('Двойной клик правой кнопкой мыши:', event);
        markUpStore.clearPoligonPoints();
        // Ваша логика обработки двойного клика
    }

    function handleKeyDown(event) {
        if (event.key === 'Shift') {
            //console.log('Клавиша Shift нажата.');
            markUpStore.setStateShiftPressed(true);
            // Тут можно добавить логику, которая должна выполняться при удерживании Shift
        }
    }

    function handleKeyUp(event) {
        if (event.key === 'Shift') {
            //console.log('Клавиша Shift отпущена.');
            markUpStore.setStateShiftPressed(false);
            // Тут можно добавить логику, которая должна выполняться после отпускания Shift
        }
    }


    useEffect(() => {
        markUpStore.loadImageFromServer();
        markUpStore.loadClassesFromServer();
    }, []);

    useEffect(() => {
        drawCanvas();
    }, [currentScale, currentPositionOffsetX, currentPositionOffsetY]);

    useEffect(() => {
        if (resizedFlag) {
            setResizedFlag(false);
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseButtonReleased);
        document.addEventListener('mousedown', handleMouseButtonPressed);
        document.addEventListener('resize', handleResize);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseButtonReleased);
            document.removeEventListener('mousedown', handleMouseButtonPressed);
            document.removeEventListener('resize', handleResize);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [resizedFlag, currentScale, currentPositionOffsetX, currentPositionOffsetY]);


    
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
                    {
                        markUpStore.stateShiftPressed ? (
                            <Actions
                                setEdit={() => { }}
                                setStateEditing={(flag) => {
                                }}
                                setMaskType={() => {

                                }}
                            />) : (
                            <></>
                        )
                    }
                </Box>
            </Box>
            {
                markUpStore.stateShiftPressed ? (
                    <ClassesList />
                ) : (<></>)}
            <TransformWrapper
                disabled={!markUpStore.stateShiftPressed}

                zoomAnimation={{
                    disabled: false,
                    animationTime: 0,
                }}
                alignmentAnimation={{
                    disabled: false,
                    animationTime: 0,
                }}
                velocityAnimation={{
                    disabled: false,
                    animationTime: 0,
                }}
                onTransformed={(e) => {
                    setCurrentScale(e.state.scale);
                    setCurrentPositionOffsetX(e.state.positionX);
                    setCurrentPositionOffsetY(e.state.positionY);
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={activeStyles}
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
                                    ref={imageRef}
                                    component="img"
                                    src={markUpStore.image}
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
            </TransformWrapper>
        </Box>
    </>
}

export default observer(MarkUpPage);