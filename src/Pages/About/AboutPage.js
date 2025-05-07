import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Center from '../../components/Center/Center';
import Hat from '../../components/Hat/Hat';


export default function AboutPage() {
    const [is_load, setLoad] = useState(false)
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    О Нас 🍜💡
                </Typography>
            </Hat>

            <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>

                <CardContent>
                    <Typography align='justify'>Мы — небольшая команда энтузиастов, объединённых общей страстью к созданию интересных IT-проектов. Этот проект стартовал как студенческая инициатива, цель которой — освоить современные технологии программирования и поделиться опытом с сообществом.</Typography>
                </CardContent>
                <CardContent>
                    <Typography align='justify'>Проект создавался буквально на коленке, а бюджет проекта составил всего лишь три пачки лапши быстрого приготовления и банку энергетика. Но именно такой подход позволил нам раскрыть творческий потенциал и набраться бесценного опыта разработки сложных продуктов.</Typography>
                </CardContent>
                <CardContent>
                    <Typography align='justify'>Сегодня мы ищем единомышленников, готовых присоединиться к нашей команде. Нам особенно необходим талантливый дизайнер, готовый поддержать нашу инициативу и внести вклад в развитие продукта. Дизайн — важнейший элемент любого успешного проекта, и мы верим, что вместе сможем создать продукт, которым будем гордиться.</Typography>
                </CardContent>
                <CardContent>
                    <Typography align='justify'>Присоединяйся к нам, ведь лучшее приключение начинается там, где заканчивается комфортная зона! Работаем исключительно за идею и удовольствие от процесса 😊✨</Typography>
                </CardContent>
            </Card>
        </Center>
    );
}
