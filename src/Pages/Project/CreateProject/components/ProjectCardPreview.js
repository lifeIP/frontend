import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';



function ProjectCardPreview({isImage, prjctName, prjctDescription, rows}) {
    const [image, setImage] = useState("https://kuzov73.ru/image/cache/no_image-1000x1000.jpg");
    useEffect(()=>{
        if(isImage !== undefined){
            setImage(isImage);
            
            console.log(isImage);
        }
    }, [isImage])

    
    return (
        <Card sx={{ width: "20vw", borderRadius: "12px", height: "45vh" }}>
            <CardMedia
                sx={{ height: "25vh" }}
                component="img"
                height="250px"
                src={image}
                alt="green iguana"
            />
            <CardContent>
                <Typography 
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                }}
                gutterBottom variant="h5" component="div" >
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
                <Divider/>
                    {rows.map((item) => `${item.label}`).join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
}


export default ProjectCardPreview;