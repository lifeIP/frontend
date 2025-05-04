import { Card, CardActionArea, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router';

function ProjectCardPreview({ isImage, prjctName, prjctDescription, rows, actionAreaDisabled = true, onClick = () => { } }) {
    const navigate = useNavigate();
    
    const [image, setImage] = useState("https://kuzov73.ru/image/cache/no_image-1000x1000.jpg");
    useEffect(() => {
        if (isImage !== undefined) {
            setImage(isImage);

            // console.log(isImage);
        }
    }, [isImage])


    return (
        <Card sx={{ width: "25vw", borderRadius: "12px", height: "45vh", position: "relative" }}>
            <CardActionArea sx={{ width: "25vw", height: "45vh" }} disabled={actionAreaDisabled} onClick={() => { onClick() }}>
                <CardMedia
                    sx={{ height: "25vh" }}
                    component="img"
                    height="250px"
                    src={image}
                    alt="image"
                />
                <CardContent>
                    <Typography
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                        }}
                        gutterBottom
                        variant="h5"
                        component="div" >
                        {prjctName}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                        }}
                        overflow={"hidden"}
                        variant="body2"
                        textAlign="justify">
                        {prjctDescription}
                    </Typography>

                    <Typography
                        sx={{
                            color: 'text.secondary',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            color: 'text.secondary',
                            marginTop: "10px"
                        }}
                        variant="body2">
                        <Divider />
                        {rows.map((item) => `${item.label}`).join(', ')}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {
                actionAreaDisabled?(
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    aria-label="settings"
                    onClick={() => {navigate("/project-settings");}}
                >
                    <SettingsIcon />
                </IconButton>
                ):(
                    <div></div>
                )
            }
        </Card>
    );
}


export default ProjectCardPreview;