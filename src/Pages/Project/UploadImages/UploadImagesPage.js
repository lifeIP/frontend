import { Box, Typography } from '@mui/material';
import React from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import DragDropFileUpload from './components/DragDropFileUpload'

export default function UploadImagesPage() {
    const handleFileUpload = (file) => {
        console.log(file);
    };
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Загрузка фотографий
                </Typography>
            </Hat>
                <DragDropFileUpload onFileUpload={handleFileUpload} />
                
        </Center>
    );
}