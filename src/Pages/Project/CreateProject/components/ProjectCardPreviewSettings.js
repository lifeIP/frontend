import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import settings from "../../../../settings.json";
import React, { useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";



function ProjectCardPreviewSettings({ setImage, setPrjctName, setPrjctDescription }) {
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleCreateProjectButtonClicked = () => {
        navigate("/project");
    };

    const handleChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log("DONE", reader.readyState); // readyState will be 2
            setImage(reader.result);
        };
        
        
    };
    return (
        <Card sx={{ borderRadius: "12px", width: "30vw", height: "45vh" }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" textAlign="center">
                    Внешний вид
                </Typography>

                <TextField
                    sx={{ marginTop: "15px" }}
                    fullWidth
                    label="Название проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" 
                    onChange={(event)=>{
                        setPrjctName(event.target.value);
                    }}
                    />
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    sx={{ marginTop: "15px" }}
                    label="Описание проекта"
                    name="project_name"
                    type="project_name"
                    variant="outlined" 
                    onChange={(event)=>{
                        setPrjctDescription(event.target.value);
                    }}
                    />

                <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={() => fileInputRef.current.click()}>Сменить фотографию проекта</Button>
                    <Button variant="contained" onClick={() => handleCreateProjectButtonClicked()} sx={{ marginLeft: "15px" }}>Создать</Button>
                    <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg" hidden />
                </Box>

            </CardContent>
        </Card>
    );
}

export default ProjectCardPreviewSettings;