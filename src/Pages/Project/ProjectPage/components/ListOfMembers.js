import { Box, Card, CardContent, Fab, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddMemberDialog from './AddMemberDialog';

function ListOfMembers() {
    return (
        <Card sx={{ width: "100%", borderRadius: "12px", height: "45vh" }}>
            <Box
                sx={{
                    display: 'flex',           // Включаем flex-вёрстку
                    alignItems: 'center',      // Центрирование по вертикали
                    justifyContent: 'center',  // Центрирование по горизонтали
                    height: '95%',            // Чтобы высота была равна высоте родителя
                }}
            >
                <Box >
                <Typography>
                    В проекте пока нет сторонних участников
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <AddMemberDialog/>
                </Box>
                </Box>
            </Box>
        </Card>
    );
}


export default ListOfMembers;