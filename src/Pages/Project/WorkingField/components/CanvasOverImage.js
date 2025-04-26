import { Box } from '@mui/material';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';


const CanvasOverImage = ({ currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, setSaved, isSaved }) => {
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
            context.lineWidth = 30 - (3*currentScale);

            if (rect_list.length === 0) {
                rect_list = JSON.parse(localStorage.getItem('rect_list'))
            }
            rect_list.map((item, index) => {
                const path1 = new Path2D();
                context.strokeStyle = item.class_color;
                item.points.map((point)=>{
                    if(point.id === 0) path1.moveTo(point.x, point.y);
                    path1.lineTo(point.x, point.y);
                    path1.moveTo(point.x, point.y);
                    
                    context.strokeStyle = "#000000";
                    context.fillRect(point.x-8, point.y-8, 16, 16);
                    context.strokeStyle = item.class_color;
                });

                path1.moveTo(item.points[0].x, item.points[0].y);
                path1.lineTo(item.points[item.points.length-1].x, item.points[item.points.length-1].y);

                path1.closePath();
                context.stroke(path1);
            })



            const path1 = new Path2D();
            context.strokeStyle = currentClass.class_color;
            path1.rect(rect_pos_x, rect_pos_y, rect_shape_w, rect_shape_h)
            path1.closePath();
            context.stroke(path1);

            context.strokeStyle = "#000000";
            context.fillRect(rect_pos_x-8, rect_pos_y-8, 16, 16);
            context.fillRect(rect_pos_x + rect_shape_w-8, rect_pos_y + rect_shape_h-8, 16, 16);
            context.fillRect(rect_pos_x-8, rect_pos_y + rect_shape_h-8, 16, 16);
            context.fillRect(rect_pos_x + rect_shape_w-8, rect_pos_y-8, 16, 16);
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
        x_pos *= 10;
        y_pos *= 10;

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

            if (Math.abs(rect_shape_w) < 80 && Math.abs(rect_shape_h) < 80) return;
            rect_class_c = currentClass.class_color;
            rect_list.push({
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
        console.log(data);
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