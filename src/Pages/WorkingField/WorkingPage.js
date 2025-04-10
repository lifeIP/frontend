import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import ImageView from './components/ImageView';


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
            <Card sx={{ width: "51.05vw" }}>
                <ImageView id={1} />
            </Card>
        </Center>
    );
}