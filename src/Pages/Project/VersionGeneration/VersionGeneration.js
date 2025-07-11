import React from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import { Card, CardContent, Typography } from '@mui/material';


export default function VersionGeneration() {

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Генерация версий датасета
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Участвующие классы
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Ребалансировка классов train/test/valid
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Изоляция объектов в отдельном кадре
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Изменение размеров
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        grayscale
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Вращение
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Зеркало
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Сдвиг
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Размытие
                    </Typography>
                </CardContent>
            </Card>
            
            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Шум
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Яркость
                    </Typography>
                </CardContent>
            </Card>
        </Center>
    );
}