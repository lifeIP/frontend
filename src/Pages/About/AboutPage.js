import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';

function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        // sx={{ minHeight: '80vh' }}
        >
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function AboutPage() {
    const [is_load, setLoad] = useState(false)
    return (
        <Center>
            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        О нас
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        
                    </Typography>
                </CardContent>
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
