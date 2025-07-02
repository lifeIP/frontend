import { Box, Card, CardContent, Fab, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

import Center from '../../../components/Center/Center';
import Hat from '../../../components/Hat/Hat';
import ProjectsListPage from '../ProjectsList/ProjectsListPage';

import AddIcon from '@mui/icons-material/Add';
import InvitationDialog from './components/InvitationDialog';

export default function ProjectsPage() {

    const [value, setValue] = React.useState(0);
    
        // Обработчик изменения активной вкладки
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
    
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Проекты
                </Typography>
            </Hat>

            <Card sx={{ width: "51.05vw" }}>
                <Box alignItems="center" justifyContent="center" display="flex">
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Ваши проекты" variant="" />
                        <Tab label="Сторонние проекты" />
                    </Tabs>
                </Box>
            </Card>
            {value == 0 ? (<ProjectsListPage />) :
                (<></>)
            }{value == 1 ? (<ProjectsListPage purpose='outside' />) :
                (<></>)
            }
        </Center>
    );
}