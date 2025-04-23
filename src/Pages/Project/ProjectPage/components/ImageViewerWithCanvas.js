import { Box } from '@mui/material';
import React from 'react';
import CanvasOverImage from '../../WorkingField/components/CanvasOverImage';


export default function ImageViewerWithCanvas({image_id}){

    return(
        <Box>
            <CanvasOverImage/>
        </Box>
    );
}