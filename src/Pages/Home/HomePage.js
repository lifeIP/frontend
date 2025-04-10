import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';


export default function HomePage() {
    const [is_load, setLoad] = useState(false)
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Главная
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                <CardContent>
                    {!is_load ? (
                        <Skeleton animation="wave" variant="rectangular" />
                    ) : (
                        <Typography gutterBottom variant="h5" component="div" textAlign="justify">

                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Center>
    );
}