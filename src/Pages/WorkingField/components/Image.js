import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Image({id}) {
    return (
        <Box>
            <Typography variant='h1'>Image: {id}</Typography>
        </Box>
    );
}