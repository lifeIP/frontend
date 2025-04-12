import { Box, Card, CardMedia, Typography } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import Actions from './Actions';

const CanvasOverImage = () => {
    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (event) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        setMousePosition({ x: relativeX, y: relativeY });
    };




    

    // Функция для рисования на канвасе
    const drawCanvas = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            const path1 = new Path2D();     // первый путь
            context.lineWidth = 7;
            path1.moveTo(20, 20);
            path1.lineTo(80, 50);
            path1.lineTo(56, 60);
            path1.closePath();    //  закрываем путь
            context.strokeStyle = "blue";
            context.stroke(path1);
        }
    };

    // Эффект для инициализации канваса после рендера
    useEffect(() => {
        drawCanvas();


        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
            <Card sx={{ width: "51.05vw" }}>
                <CardMedia
                    ref={imageRef}
                    component="img"
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
                // width={imageRef.current.width}
                // height={imageRef.current.height}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 15,
                }}
            />
            {/* <p>x: {mousePosition.x}, y: {mousePosition.y}, width: {imageRef.current.width}, height: {imageRef.current.height}</p> */}
        </Box>
    );
};

export default CanvasOverImage;