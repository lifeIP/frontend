import settings from "../../../settings.json"
import axios from 'axios'

import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Typography
} from "@mui/material";

import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function Profile() {
    const [is_load, setLoad] = useState(false)
    const fileInputRef = useRef();
    const handleChange = (event) => {
        // do something with event data
    }
    const [data, setData] = useState(
        {
            first_name: "",
            last_name: "",
            patronymic: "",
            email: "",
            is_admin: ""
        }
    )
    useEffect(() => {
        axios.get(settings.server.addr + "/user_info/")
            .then(res => {
                setData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    patronymic: res.data.patronymic,
                    email: res.data.email,
                    is_admin: res.data.is_admin
                })
                setLoad(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <Card sx={{ borderRadius: "12px", width: "20vw", height: "45vh" }}>

            {!is_load ? (
                <Skeleton sx={{ height: "25vh" }} animation="wave" variant="rectangular" />
            ) : (
                <CardActionArea onClick={()=>fileInputRef.current.click()}>
                    <CardMedia
                        sx={{ height: "25vh", resize: "horizontal" }}
                        image="https://orthomoda.ru/bitrix/templates/.default/img/no-photo.jpg"
                        title="user"
                        component="img"
                    />
                    <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg"  hidden/>
                </CardActionArea>
            )}
            <CardContent>
                {!is_load ? (
                    <Skeleton animation="wave" variant="rectangular" />
                ) : (
                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        {data.last_name} {data.first_name} {data.patronymic}
                    </Typography>
                )}

                {!is_load ? (
                    <Skeleton animation="wave" variant="rectangular" />
                ) : (
                    <Typography variant="caption" component="div" textAlign="center">
                        {data.email}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
                {!is_load ? (
                    <Skeleton animation="wave" variant="rectangular" />
                ) : (
                    <Button aria-label="edit">
                        <EditRoundedIcon size="smal" /> ИЗМЕНИТЬ
                    </Button>
                )}
            </CardActions>
        </Card>

    );
}