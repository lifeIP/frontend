import React from 'react';
import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ParticipatingClasses from './components/ParticipatingClasses';
import RebalancingClasses from './components/RebalancingClasses';
import PreProcessing from './components/PreProcessing';
import { ActionsContext } from './VersionGenerationContext';
import VersionGenerationContextProvider from './VersionGenerationContextProvider';


function ListOfActions() {

    return (<>
        <Card
            sx={{
                borderRadius: "12px",
                width: "51.05vw",
                marginBottom: '1.85vh',
            }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Список действий
                </Typography>
            </CardContent>
        </Card>
    </>);
}

export default function VersionGeneration() {
    
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Генерация версий датасета
                </Typography>
            </Hat>
            <VersionGenerationContextProvider>
                <ParticipatingClasses />
                <RebalancingClasses />
                <PreProcessing />
                <ListOfActions />
            </VersionGenerationContextProvider>
            {/* 
            

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
            </Card> */}
            <Button variant='contained' fullWidth>Сгенерировать датасет</Button>
        </Center>
    );
}