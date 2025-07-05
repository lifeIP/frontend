import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Fab, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router'

import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Главная
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom align="center">
                        Простое решение для разметки изображений
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph align="justify">
                        Приветствуем вас на платформе для эффективной и комфортной разметки изображений в проектах компьютерного зрения! Наш инструмент разработан специально для небольших и средних команд разработчиков, стремящихся упростить подготовку качественных данных для тренировки моделей машинного обучения. Создавайте высококачественные размеченные наборы данных легко и удобно благодаря нашему удобному интерфейсу и широкому набору функций. Начните работу прямо сейчас и убедитесь сами, насколько проще становится создание собственных решений компьютерного зрения!
                    </Typography>
                    <iframe src="https://vkvideo.ru/video_ext.php?oid=-30101930&id=456244614&hd=2" width="100%" height="480" allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
                </CardContent>
            </Card>
        </Center>
    );
}