import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Typography
} from '@mui/material';

import React, {
    useState
} from 'react';

import { PieChart } from '@mui/x-charts/PieChart';



export default function Statistics() {
    const [is_load, setLoad] = useState(true)
    const series = [
        {
            data: [
                { id: 0, value: 100, label: (location) => { if (location == "tooltip") return "Свободные ресурсы %" } },
                // { id: 1, value: 15, label: (location) => { if (location == "tooltip") return "some2" } },
                // { id: 2, value: 20, label: (location) => { if (location == "tooltip") return "some3" } },
            ],
        },
    ];

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
                    <Box sx={{display:"flex", justifyContent: "center", width: "30vw"}}>
                        <PieChart
                            sx={{marginLeft: 7}}
                            height={225}
                            series={series}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

// const pieParams = {
//     height: 225,
//     margin: { right: 5 },
//     hideLegend: true,
// };