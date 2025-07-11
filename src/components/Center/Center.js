import { Grid } from '@mui/material';
import React from 'react';


export default function Center(props) {
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
