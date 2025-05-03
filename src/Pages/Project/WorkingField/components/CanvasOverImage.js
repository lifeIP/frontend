import { Box } from '@mui/material';
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import settings from "../../../../settings.json"

const CanvasOverImage = ({ data_markup_classes, currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, setSaved, isSaved }) => {
    const canvasRef = useRef(null);

    let mouse_pos_x = -1;
    let mouse_pos_y = -1;

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
            context.lineWidth = 3 / currentScale;

            if (rect_list.length === 0) {
                rect_list = JSON.parse(localStorage.getItem('rect_list'))
            }
            
            rect_list.map((item, index) => {
                let multiplier_w = 1;
                let multiplier_h = 1;
                if(canvasSize.width !== item.canvasWidth){
                    multiplier_w = (item.canvasWidth / canvasSize.width);
                }
                else{
                    multiplier_w = 1;
                }
                if(canvasSize.height !== item.canvasHeight){   
                    multiplier_h = (item.canvasHeight / canvasSize.height); 
                }
                else{
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
                    context.fillRect((point.x - 3) / multiplier_w, (point.y - 3) / multiplier_w, 6, 6);
                    context.strokeStyle = item.class_color;
                });

                path1.moveTo(item.points[0].x / multiplier_w, (item.points[0].y) / multiplier_h);
                path1.lineTo(item.points[item.points.length - 1].x / multiplier_w, item.points[item.points.length - 1].y / multiplier_w);

                path1.closePath();
                context.stroke(path1);
            })



            const path1 = new Path2D();
            context.strokeStyle = currentClass.class_color;
            path1.rect(rect_pos_x, rect_pos_y, rect_shape_w, rect_shape_h)
            path1.closePath();
            context.stroke(path1);

            context.strokeStyle = "#000000";
            context.fillRect(rect_pos_x - 3, rect_pos_y - 3, 6, 6);
            context.fillRect(rect_pos_x + rect_shape_w - 3, rect_pos_y + rect_shape_h - 3, 6, 6);
            context.fillRect(rect_pos_x - 3, rect_pos_y + rect_shape_h - 3, 6, 6);
            context.fillRect(rect_pos_x + rect_shape_w - 3, rect_pos_y - 3, 6, 6);
            context.strokeStyle = currentClass.class_color;
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

            if (Math.abs(rect_shape_w) < 8 && Math.abs(rect_shape_h) < 8) return;
            rect_class_c = currentClass.class_color;
            rect_list.push({
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
            setSaved(false);
        }
    };


    function save_mask_on_server() {
        let data = localStorage.getItem('rect_list');
        // console.log(data);
    }
    useEffect(() => {
        if (isSaved === true) return;
        save_mask_on_server();
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
        if(rect_list.length != 0) return
        if(data_markup_classes[0].id === -1) return
        if(localStorage.getItem("now_is_last_list") === true) return

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