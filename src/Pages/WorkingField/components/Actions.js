import { Box, Card, CardActions, IconButton } from '@mui/material';
import React from 'react';


import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';



export default function Actions({setStateEditing}) {
    return (
        <Box sx={{
            position: 'fixed',
            right: "76.5%",
            top: "23.8%",
            zIndex: 10,
            display: "flex",
            justifyContent: "left",
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
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}