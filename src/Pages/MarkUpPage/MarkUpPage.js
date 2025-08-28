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


    const [currentPositionOffsetX, setCurrentPositionOffsetX] = useState(0);
    const [currentPositionOffsetY, setCurrentPositionOffsetY] = useState(0);


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
            if (inBox() && !markUpStore.stateShiftPressed) {
                if (mouse_pos_x == -1 || mouse_pos_y == -1) return;
                if (markUpStore.poligon_points.length == 0) {
                    // markUpStore.initNewPoligon(
                    // 
                    // );
                    // TODO: Надо добавить
                }
                markUpStore.addPoligonPoint(
                    (mouse_pos_x - currentPositionOffsetX) / markUpStore.currentScale,
                    (mouse_pos_y - currentPositionOffsetY) / markUpStore.currentScale
                );
            }
        }
    }

    function handleMouseButtonReleased(event) {
        if (event.button === 0) {

        }
    }

    function handleResize() {
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
                        path1.moveTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                    }
                    path1.lineTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                    path1.moveTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                    context.fillRect(point.x * markUpStore.currentScale + currentPositionOffsetX - 3, point.y * markUpStore.currentScale + currentPositionOffsetY - 3, 6, 6);
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
                            path1.moveTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                        }
                        path1.lineTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                        path1.moveTo(point.x * markUpStore.currentScale + currentPositionOffsetX, point.y * markUpStore.currentScale + currentPositionOffsetY);
                        context.fillRect(point.x * markUpStore.currentScale + currentPositionOffsetX - 3, point.y * markUpStore.currentScale + currentPositionOffsetY - 3, 6, 6);
                        if (index == item.points.length - 1) {
                            path1.lineTo(item.points[0].x * markUpStore.currentScale + currentPositionOffsetX, item.points[0].y * markUpStore.currentScale + currentPositionOffsetY);
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
        markUpStore.clearPoligonPoints();
        // Ваша логика обработки двойного клика
    }

    function handleKeyDown(event) {
        if (event.key === 'Shift') {
            markUpStore.setStateShiftPressed(true);
            // Тут можно добавить логику, которая должна выполняться при удерживании Shift
        }
    }

    function handleKeyUp(event) {
        if (event.key === 'Shift') {
            markUpStore.setStateShiftPressed(false);
            // Тут можно добавить логику, которая должна выполняться после отпускания Shift
        }
    }


    useEffect(() => {
        markUpStore.list_of_ids_images = JSON.parse(localStorage.getItem("list_of_ids_images"));
        markUpStore.project_id = JSON.parse(localStorage.getItem("last_project_id"));
        markUpStore.taskId = JSON.parse(localStorage.getItem("last_task_id"));
        

        markUpStore.loadListOfImages();
        markUpStore.loadImageFromServer();
        markUpStore.loadClassesFromServer();
    }, []);

    useEffect(() => {
        drawCanvas();
    }, [markUpStore.currentScale, currentPositionOffsetX, currentPositionOffsetY]);

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
    }, [resizedFlag, markUpStore.currentScale, currentPositionOffsetX, currentPositionOffsetY]);

    function useKey(key, cb) {
        const callback = useRef(cb);

        useEffect(() => {
            callback.current = cb;
        })


        useEffect(() => {
            function handle(event) {
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

    useKey('a', () => leftButtonClicked());
    useKey('d', () => rightButtonClicked());



    function rightButtonClicked() {
        // TODO: Добавить обработку нажатия
        
        if(markUpStore.list_of_ids_images.length==0){
            markUpStore.loadListOfImages();
        }
        let index_now = markUpStore.list_of_ids_images.indexOf(markUpStore.image_id);
        if (index_now == 0) {
            index_now = -1;
            localStorage.setItem("task_flag", true);
            markUpStore.image_is_loaded=false;
        }
        if (markUpStore.list_of_ids_images.length - 1 > index_now) {
            markUpStore.image_id = markUpStore.list_of_ids_images[index_now + 1]
            markUpStore.clearPoligonPoints();
            markUpStore.clearRectList();
            markUpStore.setImageId(markUpStore.image_id + 1);
            return
        }
        markUpStore.loadListOfImages(1);
    }
    function leftButtonClicked() {
        console.log("leftButtonClicked");
        // TODO: Добавить обработку нажатия
    }


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
                                onLeftButtonClicked={() => {
                                    leftButtonClicked();
                                }}
                                onRightButtonClicked={() => {
                                    rightButtonClicked();
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
                    markUpStore.setCurrentScale(e.state.scale);
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