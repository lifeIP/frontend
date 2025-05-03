import { 
    Box, 
    Card, 
    CardActions, 
    IconButton 
} from '@mui/material';
import React from 'react';


import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Actions({setStateEditing, onRightButtonClicked=()=>{}, onLeftButtonClicked=()=>{}}) {
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
                        
                        <IconButton disabled onClick={() => {
                            setStateEditing(true);
                        }}><PolylineOutlinedIcon /></IconButton>

                        <IconButton disabled onClick={() => {
                        }}><EditOutlinedIcon /></IconButton>

                        <IconButton onClick={() => {
                            onLeftButtonClicked();
                        }}><ArrowBackIosNewOutlinedIcon /></IconButton>
                        
                        <IconButton onClick={() => {
                            onRightButtonClicked();
                        }}><ArrowForwardIosOutlinedIcon /></IconButton>
                        
                        <IconButton disabled onClick={() => {
                        }}><FullscreenOutlinedIcon /></IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}