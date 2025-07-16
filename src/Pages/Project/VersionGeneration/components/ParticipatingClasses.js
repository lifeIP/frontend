import { Box, Button, Card, CardContent, Checkbox, IconButton, List, ListItem, ListItemText, ListSubheader, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import settings from "../../../../settings.json"

import { PieChart } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

// get_list_of_classes_in_project
function SomeClass({ id, class_name, class_color, class_description }) {
    const [countOfPhoto, setCountOfPhoto] = useState(586);
    const [countOfObject, setCountOfObject] = useState(11);
    async function getCount(project_id, class_id) {
        let url = "/get_count_of_objects_in_class/" + project_id + "/" + class_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setCountOfObject(res.data.count_object);
            } else {
            }
        } catch (err) {
            // console.error(err);
        }
    }

    useEffect(() => {
        getCount(localStorage.getItem("last_project_id"), id);
    }, []);
    return (
        <>
            <ListItemText
                primary={
                    <>
                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ marginRight: "4px" }} variant="subtitle1" color="text.primary">Имя класса:</Typography>
                            <Typography sx={{ minWidth: "14%" }} variant="subtitle1" fontWeight="bold" color="text.primary">
                                {class_name}
                            </Typography>

                            <Typography sx={{ marginRight: "4px" }} variant="subtitle1">Цвет:</Typography>
                            <Typography color={class_color} variant="subtitle1">
                                {class_color}
                            </Typography>
                        </Box>
                    </>
                }
                secondary={
                    <Box>
                        <Typography variant="body2" color="text.secondary" >
                            {class_description != "" ? class_description : "Нет описания"}
                        </Typography>
                        <Box sx={{ marginTop: "3px", display: "flex" }}>
                            <Typography marginRight="15px" variant="body2" fontWeight="bold" color="text.secondary">Фотографий: {countOfPhoto}</Typography>
                            <Typography variant="body2" fontWeight="bold" color="text.secondary">Объектов: {countOfObject}</Typography>
                        </Box>
                    </Box>
                }
            />
            <ListSubheader>
                <Checkbox defaultChecked />
            </ListSubheader>
        </>
    );
}


function SomePie() {
    const [is_load, setLoad] = useState(true);
    const [series, setSeries] = useState([
        {
            data: [
                { value: 100, label: "Глаз" },
                { value: 121, label: "Рот" },
                { value: 151, label: "Нос" },
                { value: 10, label: "Ебало" },
                { value: 113, label: "Хлебало" },
                { value: 113, label: "Флюгенгехаймен" },
                { value: 10, label: "Ебало 2" },
                { value: 113, label: "Хлебало 2" },
            ],
        },
    ]);
    const otherProps = {
        width: 450,
        height: 250,
    };


    async function getSeries(project_id) {
        let url = "/get_series_for_pie/" + project_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                // setSeries(res.data.series);
                console.log(res.data)
                let data = []
                res.data.map((item)=>{
                    data.push({value: 25, label: item.class_name, color: item.class_color});
                });
                setSeries([{data: data}]);
            } else {
            }
        } catch (err) {
            // console.error(err);
        }
    }
    useEffect(() => {
        getSeries(localStorage.getItem("last_project_id"));
    }, []);

    return (
        <Box sx={{ height: 300, width: 350, display: "flex", justifyContent: "center" }}>
            {!is_load ? (
                <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                        series={series}
                        {...otherProps}
                    />
                </Box>
            )
            }
        </Box >
    );
}

export default function ParticipatingClasses() {
    const [listOfClasses, setListOfClasses] = useState([]);
    async function getAllClasses(project_id) {
        let url = "/get_list_of_classes_in_project/" + project_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListOfClasses(res.data);
                console.log(res.data)
            } else {
            }
        } catch (err) {
            // console.error(err);
        }
    }

    useState(() => {
        getAllClasses(localStorage.getItem("last_project_id"));
    }, []);
    return (<>
        <Card sx={{ borderRadius: "12px", width: "51.05vw", marginBottom: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Участвующие классы
                </Typography>
            </CardContent>
            <SomePie />
            <CardContent>
                <List disablePadding sx={{ overflowY: "auto", maxHeight: "350px", '& ul': { padding: 0 }, width: "100%" }}>
                    <Typography>Список классов</Typography>
                    {listOfClasses.map((item) =>
                        <ListItem
                            divider
                            key={item.id}
                        >
                            <SomeClass id={item.id} class_name={item.class_name} class_color={item.class_color} class_description={item.class_description} />
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    </>);
}