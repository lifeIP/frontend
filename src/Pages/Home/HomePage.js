import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Fab, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router'

import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';
import AddIcon from '@mui/icons-material/Add';
import ProjectCardPreview from '../Project/CreateProject/components/ProjectCardPreview';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Главная
                </Typography>
            </Hat>

            <Box sx={{ marginBottom: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Ваши проекты
                        </Typography>
                    </CardContent>
                    
                    <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">Все проекты</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Тута должны отображаться все проекты. Если вы видете эту надпись, то это значит, что разрабы ушли в запой. Пожалуйста, сообщите об этом администрации сайта, перейдя в tg-канал.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Fab size="medium" aria-label="добавить класс" onClick={()=>{navigate("/create-project")}}>
                                <AddIcon />
                            </Fab>
                        </Box>
                    </CardContent>
                </Card>
                
            </Box>
            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" textAlign="center">
                        Полезная информация
                    </Typography>
                </CardContent>
            </Card>
        </Center>
    );
}