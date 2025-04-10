import { Box, Typography } from '@mui/material';
import React from 'react';

export default function SquareSelection() {
    const startDrawingRectangle = ({ nativeEvent }) => { };
    const drawRectangle = ({ nativeEvent }) => { };
    const stopDrawingRectangle = () => { };

    return (

        <canvas className="canvas-container-rect"
            onMouseDown={startDrawingRectangle}
            onMouseMove={drawRectangle}
            onMouseUp={stopDrawingRectangle}
            onMouseLeave={stopDrawingRectangle}
        >
        </canvas>

    );
}