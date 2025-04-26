import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import DragDropFileUpload from './components/DragDropFileUpload'
import ImageUploadViewer from './components/ImageUploadViewer';

export default function UploadImagesPage() {
    const [files, setFiles] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [startUpload, setStartUpload] = useState(false);

    useEffect(()=>{
        if(files.length == 0) return;
        setButtonDisabled(false);
    }, [files]);

    const handleFileUpload = (files) => {
        let all_files = []
        if (files === undefined) return;
        if (files.length === 0) return;
        Array.from(files).map(element => {
            let file_type = element.type;
            if (file_type === "image/jpg" || file_type === "image/jpeg" || file_type === "image/png") {
                console.log("Доступно");
                all_files.push(element);
            }
        });
        setFiles(all_files);
    };
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Загрузка фотографий
                </Typography>
            </Hat>
            <DragDropFileUpload onFileUpload={handleFileUpload} />
            <Button
                disabled={buttonDisabled}
                variant='contained'
                fullWidth
                sx={{ marginTop: "1.75vh" }}
                onClick={()=>{
                    setStartUpload(true);
                }}
            >Отправить</Button>

            <Box sx={{ maxWidth: "51.05vw", marginTop: "1.75vh" }}>
                <Grid container spacing={1}>
                    {files.map((item) => (
                        <Grid size={3}>
                            <ImageUploadViewer file={item} startUpload={startUpload} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
}