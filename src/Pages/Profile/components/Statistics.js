import { 
    Card, 
    CardContent, 
    Skeleton, 
    Typography 
} from '@mui/material';

import React, { 
    useState 
} from 'react';

import { PieChart } from '@mui/x-charts';


export default function Statistics() {
    const [is_load, setLoad] = useState(false)  
    return (
        <Card sx={{ borderRadius: "12px", width: "30vw", height: "45vh" }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" textAlign="center">
                    Ресурсы
                </Typography>
            </CardContent>
            <CardContent>
                {!is_load ? (
                    <Skeleton sx={{ height: 235 }} animation="wave" variant="rectangular" />
                ) : (
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'M124' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={235}
                    />
                )}
            </CardContent>
        </Card>
    );
}