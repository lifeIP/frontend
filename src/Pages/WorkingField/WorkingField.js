import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Card from '@mui/material/Card';


export default function WorkingField() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const componentRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!componentRef.current) return;

        const rect = componentRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        setMousePosition({ x: relativeX, y: relativeY });
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Card sx={{ width: "51.05vw"}}>
            <TransformWrapper>
                <TransformComponent>
                    <Card>
                    <div
                        style={{
                            width: '1024x',
                            height: '612px',
                            backgroundColor: '#00000010',
                        }}
                        ref={componentRef}
                    >
                        <p>Mouse position inside the component:</p>
                        <p>x: {mousePosition.x}, y: {mousePosition.y}</p>
                    </div>
                    </Card>
                </TransformComponent>
            </TransformWrapper>
        </Card>
    );
}