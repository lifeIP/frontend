import { Box, Card, CardContent, Fab, Typography } from '@mui/material';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

export default function ListDatasetVersion() {
    const navigate = useNavigate();
    const [numberOfVersions, setNumberOfVersions] = useState(0);

    return (
        <>
            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fab size="medium" aria-label="добавить фото в проект" onClick={() => { navigate("/upload-images") }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </CardContent>
                <Typography variant="h6" gutterBottom>
                    Версий: {numberOfVersions}
                </Typography>
            </Card>
            {numberOfVersions == 0 ? (<>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardContent>
                        <Typography>
                            Тут пока что ничего нет. Попробуйте создать новую версию на основе вашего набора данных.
                        </Typography>
                    </CardContent>
                </Card>
            </>) : (<></>)}
        </>
    );
}