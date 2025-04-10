import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export default function Hat(props) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '1.85vh' }}>
            <Card sx={{ borderRadius: "12px", width: "51.05vw", height: "100px" }}>
                <CardContent>
                        {props.children}                    
                </CardContent>
            </Card>
        </Box>
    );
}