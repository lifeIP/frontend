import {
    Box,
    CardContent,
    List,
    ListItemText,
    Skeleton,
    Typography
} from '@mui/material';

import React, {
    memo,
    useEffect,
    useState
} from 'react';

import Card from '@mui/material/Card';
import SmartMarkup from './components/SmartMarkup';
import Center from '../../../components/Center/Center'
import Hat from '../../../components/Hat/Hat';

export default function WorkingField() {
    const [projectId, setProjectId] = useState(0);
    useEffect(() => {
        localStorage.setItem('rect_list', JSON.stringify([]));
        setProjectId(localStorage.getItem("last_project_id"));
    }, [])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Разметка
                </Typography>
            </Hat>

            <Box>
                <SmartMarkupComponent project_id={projectId} />
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: '1.85vh'
            }}>
                <Card elevation={3} sx={{
                    borderRadius: "12px",
                    width: "51.05vw",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center" fontWeight="bold">
                            Информация
                        </Typography>
                        <List dense disablePadding>
                            <ListItemText primary={<Typography>Ctrl — Включить режим зума</Typography>} />
                            <ListItemText primary={<Typography>Shift — Включить режим разметки (квадрат)</Typography>} />
                            <ListItemText primary={<Typography>S — Сохранить изменения</Typography>} />
                            <ListItemText primary={<Typography>A — Предыдущая фотография</Typography>} />
                            <ListItemText primary={<Typography>D — Следующая фотография</Typography>} />
                        </List>
                    </CardContent>
                </Card>
            </Box>

        </Center>
    );
}

const SmartMarkupComponent = memo(({ project_id }) => {
    return <SmartMarkup project_id={project_id} />
});