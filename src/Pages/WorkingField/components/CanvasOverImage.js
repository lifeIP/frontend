import { Box, Typography } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import ImageView from './ImageView';
import Actions from './Actions';

const CanvasOverImage = () => {
    const canvasRef = useRef(null);

    // Функция для рисования на канвасе
    const drawCanvas = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.fillStyle = '#ff0000'; // Красный цвет

            context.beginPath();
            context.strokeRect(20, 45, 100, 100);
            context.closePath();
            context.stroke();
        }
    };

    // Эффект для инициализации канваса после рендера
    useEffect(() => {
        drawCanvas();
    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
            <ImageView />

            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                }}
            />
        </Box>
    );
};

export default CanvasOverImage;