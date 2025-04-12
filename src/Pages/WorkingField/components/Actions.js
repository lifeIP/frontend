import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';


import { Box, Button, Card, CardActions, IconButton, Typography } from '@mui/material';
import React from 'react';


export default function Actions() {
    return (
        <Box sx={{
            position: 'fixed',  // Закрепляем блок
            left: "76.5%",             // Слева от экрана
            top: "24%",          // Отступ снизу 20 пикселей
            zIndex: 10,          // Убедимся, что блок поверх остальных
            display: "flex",
            justifyContent: "left",
            // height: '12%'
        }}>
            <Card sx={{ borderRadius: "12px" }}>
                <CardActions >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton><RectangleOutlinedIcon /></IconButton>
                        <IconButton><OpenInFullOutlinedIcon /></IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}