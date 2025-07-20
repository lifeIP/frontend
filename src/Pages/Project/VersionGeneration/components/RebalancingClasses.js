import { Box, Card, CardContent, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import settings from '../../../../settings.json'
import { PieChart } from '@mui/x-charts';

function SomePie({ listOfClasses }) {

    const [series, setSeries] = useState([
        {
            data: [
            ],
        },
    ]);

    const otherProps = {
        width: 450,
        height: 250,
    };


    useEffect(() => {
        let data = []
        listOfClasses.map((item) => {
            data.push(
                {
                    value: item.value,
                    label: item.label,
                    color: item.color
                });
        });
        setSeries([{ data: data }]);
    }, [listOfClasses]);

    return (
        <Box sx={{ height: 300, width: 350, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                    series={series}
                    {...otherProps}
                />
            </Box>
        </Box >
    );
}


function DistanceSliuder({ value1, setValue1, imageCount, setImageCount }) {
    function valuetext(value) {
        return `${value}%`;
    }
    const minDistance = 0;


    const handleChange1 = (event, newValue, activeThumb) => {
        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
        console.log(Math.floor(imageCount * (Number((imageCount - value1[1]) / 100))))
    };

    return (<>
        <Box>
            <Slider
                track={false}
                aria-labelledby="track-false-range-slider"
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}

                disableSwap
            />
            <Typography>Всего размеченных фотографий: {imageCount}</Typography>
            <Typography>train: {value1[0]}%, test: {value1[1] - value1[0]}%, valid: {100 - value1[1]}%</Typography>
            <Typography>train: {Math.ceil(imageCount * (Number(value1[0] / 100)))},
                test: {Math.floor(imageCount * (Number((value1[1] - value1[0]) / 100)))},
                valid: {(imageCount - Math.ceil(imageCount * (Number(value1[0] / 100))) -
                    Math.floor(imageCount * (Number((value1[1] - value1[0]) / 100))))}</Typography>

        </Box>
    </>)
}

export default function RebalancingClasses() {

    const [value1, setValue1] = React.useState([70, 90]);
    const [imageCount, setImageCount] = React.useState(0);

    async function getDatasetImageCount() {
        let url = `/get_data_of_classes_for_rebalancing/${JSON.parse(localStorage.getItem('last_project_id'))}`;
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            const res = await axios.get(`${settings.server.addr}${url}`);
            if (res.status === 200 || res.status === 201) {
                setImageCount(res.data.image_count);
            } else {
            }
        } catch (err) {
            console.error('Ошибка загрузки:', err.message);
        }
    }

    React.useEffect(() => {
        getDatasetImageCount();
    }, [])

    return (<>
        <Card
            sx={{
                borderRadius: "12px",
                width: "51.05vw",
                marginBottom: '1.85vh',
            }}>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    textAlign="center">
                    Ребалансировка классов
                </Typography>
            </CardContent>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <SomePie listOfClasses={[
                {
                    value: Math.ceil(imageCount * (Number(value1[0] / 100))),
                    label: "train",
                    color: "#4CAF50"
                },
                {
                    value: Math.floor(imageCount * (Number((value1[1] - value1[0]) / 100))),
                    label: "test",
                    color: "#2196F3"
                },
                {
                    value: (imageCount - Math.ceil(imageCount * (Number(value1[0] / 100))) -
                        Math.floor(imageCount * (Number((value1[1] - value1[0]) / 100)))),
                    label: "valid",
                    color: "#FFC107"
                }
            ]} />
            </Box>
            <CardContent>
                <DistanceSliuder
                    value1={value1}
                    setValue1={setValue1}
                    imageCount={imageCount}
                    setImageCount={setImageCount} />
            </CardContent>
            
        </Card>
    </>);
}