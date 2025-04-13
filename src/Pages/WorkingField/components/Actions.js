import { Box, Card, CardActions, IconButton } from '@mui/material';
import React from 'react';


import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';



export default function Actions({setStateEditing}) {
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
                        <IconButton onClick={() => {
                            setStateEditing(false);
                        }}><PanToolOutlinedIcon /></IconButton>
                        <IconButton onClick={() => {
                            setStateEditing(true);
                        }}><RectangleOutlinedIcon /></IconButton>
                        <IconButton><OpenInFullOutlinedIcon /></IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}