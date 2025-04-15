import { 
    Box, 
    CardContent, 
    Skeleton, 
    Typography 
} from '@mui/material';

import React, { 
    memo, 
    useEffect
} from 'react';

import Card from '@mui/material/Card';
import SmartMarkup from './components/SmartMarkup';
import Center from '../../../components/Center/Center'
import Hat from '../../../components/Hat/Hat';

export default function WorkingField() {
    useEffect(() => { localStorage.setItem('rect_list', JSON.stringify([])); }, [])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Разметка
                </Typography>
            </Hat>

            <Box>
                <SmartMarkupComponent project_id={0}/>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Информация
                        </Typography>
                        <Skeleton sx={{ height: "10vh" }} animation="wave" variant="rectangular" />
                    </CardContent>
                </Card>
            </Box>
        </Center>
    );
}

const SmartMarkupComponent = memo(({ project_id }) => {
    return <SmartMarkup project_id={project_id} />
});