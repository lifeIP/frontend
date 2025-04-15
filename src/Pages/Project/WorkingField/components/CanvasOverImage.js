import { Box } from '@mui/material';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';


const CanvasOverImage = ({ currentClass, currentScale, inBoundingBox, stateEditing, canvasSize }) => {

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