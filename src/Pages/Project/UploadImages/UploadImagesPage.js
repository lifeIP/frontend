import { Box, Typography } from '@mui/material';
import React from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import DragDropFileUpload from './components/DragDropFileUpload'

export default function UploadImagesPage() {
    const handleFileUpload = (files) => {
        // console.log(files);
        if(files === undefined) return;
        if(files.length === 0) return;
        Array.from(files).map(element => {
            let file_type = element.type;
            if (file_type === "image/jpg" || file_type === "image/jpeg" || file_type === "image/png") {
                console.log("Доступно");
            }
        });
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