import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';


export default function PreProcessing(){

    return(<>
    <Card
            sx={{
                borderRadius: "12px",
                width: "51.05vw",
                marginBottom: '1.85vh',
            }}>
                <CardContent>
                <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    textAlign="center">
                    Предварительная обработка
                </Typography>
            </CardContent>

            </Card>
    </>);
}