import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';


function ListOfMembers() {
    return (
        <Card sx={{ width: "100%", borderRadius: "12px", height: "45vh" }}>
            <CardContent>
                <Typography>
                    Список участников
                </Typography>
            </CardContent>
        </Card>
    );
}


export default ListOfMembers;