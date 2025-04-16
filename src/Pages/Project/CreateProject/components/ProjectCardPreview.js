import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import React from 'react';



function ProjectCardPreview({prjctName, prjctDescription, prjctListClasses}) {
    return (
        <Card sx={{ width: "20vw", borderRadius: "12px", height: "45vh" }}>
            <CardMedia
                sx={{ height: "25vh" }}
                component="img"
                height="250px"
                image="https://steamuserimages-a.akamaihd.net/ugc/781852198000334383/FB420C9BB97252C586F11D0BAA9FE46EEAB4F720/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {prjctName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign="justify">
                    {prjctDescription}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: "10px" }}>
                <Divider/>
                    {prjctListClasses.map((item) => `${item}`).join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
}


export default ProjectCardPreview;