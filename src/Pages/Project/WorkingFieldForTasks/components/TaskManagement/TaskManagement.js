import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import MinimumDistanceSlider from './MinimumDistanceSlider';


export default function TaskManagement() {
    const [user_rights, set_user_rights] = useState(2);
    useEffect(() => {
        set_user_rights(JSON.parse(localStorage.getItem("user_rights")));
    }, [])
    return (
        <Card sx={{
            borderRadius: "12px",
            width: "51.05vw",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
        }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center" fontWeight="bold">
                    Управление
                </Typography>
                <Typography>
                    Вы имеете доступ: {user_rights == 0 ? "АДМИНИСТРАТОР" : ""}{user_rights == 1 ? "КОНТРОЛЁР" : ""}{user_rights == 2 ? "РАБОЧИЙ" : ""}
                </Typography>
                {user_rights <= 1 ? (
                    <>
                    <Typography>
                    Распределение классов в датасете
                </Typography>
                <Typography>
                    Разделение датасета на train/test/valid
                </Typography>
                <MinimumDistanceSlider/>
                </>
                ) : (<>
                <Box marginTop='1.85vh'>
                <Button fullWidth variant='contained'>Отправить на проверку</Button>
                </Box>
                </>)}

            </CardContent>
        </Card>
    );
}