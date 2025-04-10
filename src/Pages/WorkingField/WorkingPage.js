import { Box, Button, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import ImageView from './components/ImageView';
import SmartMarkup from './components/SmartMarkup';


function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function WorkingField() {
    return (
        <Center>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '1.85vh'}}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", height: "100px"  }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Разметка
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box>
            <SmartMarkup />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Информация
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Center>
    );
}