import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Skeleton,
    Typography
} from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import settings from "../../../../settings.json"

import { PieChart } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

// get_list_of_classes_in_project
function SomeClass({ id, class_name, class_color, class_description, class_count, class_photo_count, hideClass, setHideClass }) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked == false) {
            setHideClass([...hideClass, id]);
        }
        else {
            setHideClass(hideClass.filter((item) => item !== id));
        }
    };

    return (
        <>
            <ListItemText
                primary={
                    <>
                        <Box sx={{ display: "flex" }}>
                            <Typography
                                sx={{
                                    marginRight: "4px"
                                }}
                                variant="subtitle1"
                                color="text.primary">
                                Имя класса:
                            </Typography>
                            <Typography
                                sx={{
                                    minWidth: "14%"
                                }}
                                variant="subtitle1"
                                fontWeight="bold"
                                color="text.primary">
                                {class_name}
                            </Typography>

                            <Typography
                                sx={{ marginRight: "4px" }}
                                variant="subtitle1">
                                Цвет:
                            </Typography>
                            <Typography
                                color={class_color}
                                variant="subtitle1">
                                {class_color}
                            </Typography>
                        </Box>
                    </>
                }
                secondary={
                    <Box
                        sx={{
                        }}>
                        <Typography variant="body2" color="text.secondary" >
                            {class_description != "" ? class_description : "Нет описания"}
                        </Typography>
                        <Box sx={{ marginTop: "3px", display: "flex" }}>
                            {/* <Typography
                                marginRight="15px"
                                variant="body2"
                                fontWeight="bold"
                                color="text.secondary">
                                Фотографий: {class_photo_count}
                            </Typography> */}
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="text.secondary">
                                Объектов: {class_count}
                            </Typography>
                        </Box>
                    </Box>
                }
            />
            <ListSubheader>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                />
            </ListSubheader>
        </>
    );
}


function SomePie({ listOfClasses, hideClass, is_load }) {

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
        console.log(hideClass)
        console.log(listOfClasses)
        listOfClasses.map((item) => {
            if (hideClass?.filter((item2) => item2 == item.class_id).length == 0) {
                data.push(
                    {
                        value: item.class_count,
                        label: item.class_name,
                        color: item.class_color
                    });
            }

        });
        setSeries([{ data: data }]);
    }, [hideClass, listOfClasses]);

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
    const [hideClass, setHideClass] = useState([]);

    // const [is_load, setLoad] = useState(true);


    async function getAllClasses(project_id) {
        let url = "/get_series_for_pie/" + project_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListOfClasses(res.data);
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
        <Card
            sx={{
                borderRadius: "12px",
                width: "51.05vw",
                marginBottom: '1.85vh',
            }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Участвующие классы
                </Typography>
            </CardContent>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <SomePie listOfClasses={listOfClasses} hideClass={hideClass} is_load={true} />
            </Box>
            <CardContent>
                <List disablePadding
                    sx={{
                        overflowY: "auto",
                        maxHeight: "350px",
                        '& ul': { padding: 0 },
                        width: "100%"
                    }}>
                    <Typography>Список классов</Typography>
                    {listOfClasses.map((item) =>
                        <ListItem
                            divider
                            key={item.id}
                        >
                            <SomeClass id={item.class_id}
                                class_name={item.class_name}
                                class_color={item.class_color}
                                class_description={item.class_description}
                                class_count={item.class_count}
                                class_photo_count={item.class_photo_count}
                                hideClass={hideClass}
                                setHideClass={setHideClass}
                            />
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    </>);
}