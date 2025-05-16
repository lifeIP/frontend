import { Box } from '@mui/material';
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import settings from "../../../../settings.json"

const CanvasOverImage = ({ maskType, edit, data_markup_classes, currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, setSaved, isSaved }) => {
    const canvasRef = useRef(null);

    let mouse_pos_x = -1;
    let mouse_pos_y = -1;

    let rect_pos_x = 0;
    let rect_pos_y = 0;
    let rect_shape_w = 0;
    let rect_shape_h = 0;
    let rect_class_c = "#00FF00";
    let rect_list = [];
    let poligon_points = [];


    // Функция для рисования на канвасе
    const drawCanvas = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.lineWidth = 3 / currentScale;

            if (rect_list.length === 0) {
                rect_list = JSON.parse(localStorage.getItem('rect_list'))
                poligon_points = JSON.parse(localStorage.getItem('poligon_points_list'))
            }

            rect_list.map((item, index) => {
                let multiplier_w = 1;
                let multiplier_h = 1;
                if (canvasSize.width !== item.canvasWidth) {
                    multiplier_w = (item.canvasWidth / canvasSize.width);
                }
                else {
                    multiplier_w = 1;
                }
                if (canvasSize.height !== item.canvasHeight) {
                    multiplier_h = (item.canvasHeight / canvasSize.height);
                }
                else {
                    multiplier_h = 1;
                }
                // console.log(multiplier_w)
                // console.log(multiplier_h)
                const path1 = new Path2D();
                context.strokeStyle = item.class_color;
                item.points.map((point) => {
                    if (point.id === 0) path1.moveTo(point.x / multiplier_w, point.y / multiplier_h);
                    path1.lineTo(point.x / multiplier_w, point.y / multiplier_h);
                    path1.moveTo(point.x / multiplier_w, point.y / multiplier_h);

                    context.strokeStyle = "#000000";
                    // contain(item);
                    context.fillRect((point.x - (3 / currentScale)) / multiplier_w, (point.y - (3 / currentScale)) / multiplier_w, (6 / currentScale), (6 / currentScale));
                    context.strokeStyle = item.class_color;
                });

                path1.moveTo(item.points[0].x / multiplier_w, (item.points[0].y) / multiplier_h);
                path1.lineTo(item.points[item.points.length - 1].x / multiplier_w, item.points[item.points.length - 1].y / multiplier_w);

                path1.closePath();
                context.stroke(path1);
            })


            if (maskType == 0) {
                const path1 = new Path2D();
                context.strokeStyle = currentClass.class_color;
                path1.rect(rect_pos_x, rect_pos_y, rect_shape_w, rect_shape_h)
                path1.closePath();
                context.stroke(path1);

                context.strokeStyle = "#000000";
                context.fillRect(rect_pos_x - (3 / currentScale), rect_pos_y - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                context.fillRect(rect_pos_x + rect_shape_w - (3 / currentScale), rect_pos_y + rect_shape_h - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                context.fillRect(rect_pos_x - (3 / currentScale), rect_pos_y + rect_shape_h - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                context.fillRect(rect_pos_x + rect_shape_w - (3 / currentScale), rect_pos_y - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                context.strokeStyle = currentClass.class_color;
            }
            else {
                if (edit) return
                const path1 = new Path2D();
                context.strokeStyle = currentClass.class_color;
                poligon_points.map((point, index) => {
                    if (index == 0) {
                        path1.moveTo(point.x, point.y);
                    }
                    path1.lineTo(point.x, point.y);
                    path1.moveTo(point.x, point.y);
                    context.fillRect(point.x - (3 / currentScale), point.y - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                })
                if (mouse_pos_x > 0 || mouse_pos_y > 0) {
                    path1.lineTo(mouse_pos_x, mouse_pos_y);
                    path1.moveTo(mouse_pos_x, mouse_pos_y);
                    context.fillRect(mouse_pos_x - (3 / currentScale), mouse_pos_y - (3 / currentScale), (6 / currentScale), (6 / currentScale));
                }
                path1.closePath();
                context.stroke(path1);
            }
        }
    };



    let leftButtonPressed = false;
    let selected_point = false;
    let selected_rect_id = 0;
    let selected_point_id = 0;

    function handleLeftButtonPressed(event) {
        if (!inBoundingBox || !stateEditing) { return }

        if (edit && stateEditing) {
            function contain() {
                let answer = false;
                rect_list.map((item, index) => {
                    let multiplier_w = 1;
                    let multiplier_h = 1;
                    if (canvasSize.width !== item.canvasWidth) {
                        multiplier_w = (item.canvasWidth / canvasSize.width);
                    }
                    else {
                        multiplier_w = 1;
                    }
                    if (canvasSize.height !== item.canvasHeight) {
                        multiplier_h = (item.canvasHeight / canvasSize.height);
                    }
                    else {
                        multiplier_h = 1;
                    }

                    item.points.map((point, id) => {
                        if (Math.abs(point.x / multiplier_w - mouse_pos_x) < 3 && Math.abs(point.y / multiplier_h - mouse_pos_y) < 3) {
                            console.log(index + " / " + id);
                            selected_rect_id = index;
                            selected_point_id = id;
                            answer = true;
                            return true;
                        }
                    });
                });
                return answer;
            }
            selected_point = contain();
        }
        if (event.button === 0 && !edit) {
            leftButtonPressed = true;
            if (maskType == 0) {
                rect_pos_x = mouse_pos_x;
                rect_pos_y = mouse_pos_y;
            }
        }



    };

    const handleLeftButtonReleased = (event) => {
        if (!inBoundingBox || !stateEditing) { return }
        if (selected_point) selected_point = false;
        if (leftButtonPressed && event.button === 0) {
            leftButtonPressed = false;
            console.log('Левая кнопка отпущена');


            if (maskType == 0) {
                if (Math.abs(rect_shape_w) < 8 && Math.abs(rect_shape_h) < 8) return;
                rect_class_c = currentClass.class_color;
                rect_list.push({
                    mask_type: 0,
                    canvasWidth: canvasSize.width,
                    canvasHeight: canvasSize.height,
                    class_id: currentClass.id,
                    class_color: currentClass.class_color,
                    class_name: currentClass.class_name,
                    points: [
                        {
                            id: 0,
                            x: rect_pos_x,
                            y: rect_pos_y,
                        },
                        {
                            id: 1,
                            x: rect_pos_x + rect_shape_w,
                            y: rect_pos_y,
                        },
                        {
                            id: 2,
                            x: rect_pos_x + rect_shape_w,
                            y: rect_pos_y + rect_shape_h,
                        },
                        {
                            id: 3,
                            x: rect_pos_x,
                            y: rect_pos_y + rect_shape_h,
                        }
                    ]
                })
                localStorage.setItem('rect_list', JSON.stringify(rect_list));
            }
            else {
                if (mouse_pos_x == -1 || mouse_pos_y == -1) { return }
                if (poligon_points.length > 2) {
                    const dist_points = Math.sqrt((mouse_pos_x - poligon_points.at(0).x) ** 2 + (mouse_pos_y - poligon_points.at(0).y) ** 2)
                    if (dist_points < 8) {
                        // poligon_points.push({ id: poligon_points.length, x: poligon_points.at(0).x, y: poligon_points.at(0).y })
                        rect_list.push({
                            mask_type: 1,
                            canvasWidth: canvasSize.width,
                            canvasHeight: canvasSize.height,
                            class_id: currentClass.id,
                            class_color: currentClass.class_color,
                            class_name: currentClass.class_name,
                            points: poligon_points
                        })
                        localStorage.setItem('rect_list', JSON.stringify(rect_list));
                        localStorage.setItem('poligon_points_list', JSON.stringify([]));
                        poligon_points = []
                        return
                    }
                }
                poligon_points.push({ id: poligon_points.length, x: mouse_pos_x, y: mouse_pos_y });
                localStorage.setItem('poligon_points_list', JSON.stringify(poligon_points));
            }
            setSaved(false);
        }
    };

    const handleMouseMove = (event) => {

        if (!inBoundingBox || !stateEditing) { return }

        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        let x_pos = relativeX / currentScale;
        let y_pos = relativeY / currentScale;

        mouse_pos_x = x_pos;
        mouse_pos_y = y_pos;

        if (selected_point) {
            if (rect_list.at(selected_rect_id).mask_type == 0) {
                if (selected_point_id == 0) {
                    rect_list.at(selected_rect_id).points.at(0).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(0).y = mouse_pos_y;
                    rect_list.at(selected_rect_id).points.at(3).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(1).y = mouse_pos_y;
                } else if (selected_point_id == 1) {
                    rect_list.at(selected_rect_id).points.at(1).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(1).y = mouse_pos_y;
                    rect_list.at(selected_rect_id).points.at(2).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(0).y = mouse_pos_y;
                } else if (selected_point_id == 2) {
                    rect_list.at(selected_rect_id).points.at(2).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(2).y = mouse_pos_y;
                    rect_list.at(selected_rect_id).points.at(1).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(3).y = mouse_pos_y;
                } else if (selected_point_id == 3) {
                    rect_list.at(selected_rect_id).points.at(3).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(3).y = mouse_pos_y;
                    rect_list.at(selected_rect_id).points.at(0).x = mouse_pos_x;
                    rect_list.at(selected_rect_id).points.at(2).y = mouse_pos_y;
                }
            }
            else{
                rect_list.at(selected_rect_id).points.at(selected_point_id).x = mouse_pos_x;
                rect_list.at(selected_rect_id).points.at(selected_point_id).y = mouse_pos_y;
            }
            localStorage.setItem('rect_list', JSON.stringify(rect_list));

        }
        if (leftButtonPressed) {
            // console.log(selected_point);
            rect_shape_w = mouse_pos_x - rect_pos_x;
            rect_shape_h = mouse_pos_y - rect_pos_y;
        }
        drawCanvas();
    };

    useEffect(() => {
        if (isSaved === true) return;
        setSaved(true);
    }, [isSaved]);




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


    const findByClassId = (arr, targetClassId) => {
        // Поиск первого совпадающего элемента по полю class_id
        const foundItem = arr.find(item => item.id === targetClassId);
        return foundItem || null; // вернем найденный элемент или null, если ничего не найдено
    };

    useEffect(() => {
        if (rect_list.length != 0) return
        if (data_markup_classes[0].id === -1) return
        if (localStorage.getItem("now_is_last_list") === true) return

        // console.log(data_markup_classes);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get_mask_on_image/${localStorage.getItem("working-field-image-id")}`)
            .then(res => {
                if (res.data.forms.length === 0) localStorage.setItem("now_is_last_list", true)
                res.data.forms.map((item) => {

                    let finded_item = findByClassId(data_markup_classes, item.class_id);


                    rect_list.push({
                        canvasWidth: res.data.canvasWidth,
                        canvasHeight: res.data.canvasHeight,
                        ...finded_item,
                        ...item,
                    })
                })
                localStorage.setItem('rect_list', JSON.stringify(rect_list));
                localStorage.setItem('poligon_points_list', JSON.stringify(poligon_points));
            })
            .catch(err => {
                console.log(err);
            })
    }, [data_markup_classes, canvasSize, currentScale]);

    return (
        <Box>
            {/* {
                isLoading ? (
                    <Skeleton animation="wave" variant="rectangular" sx={{ height: "15vh" }} />
                ) : ( */}
            <Box>
                <Box>
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
                </Box>
            </Box>
            {/* )
            } */}

            {/* <p>x: {mousePosition.x}, y: {mousePosition.y}</p>
            <p>width: {canvasSize.width}, height: {canvasSize.height}</p> */}
        </Box>
    );
};

export default CanvasOverImage;