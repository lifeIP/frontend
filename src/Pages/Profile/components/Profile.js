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


function sendImageOnServer(path = "/upload-image-on-profile/", event, setLoad){
    var formData = new FormData();
    formData.append(
        "file",
        event.target.files[0],
        event.target.files[0].name
    );
    const headers = { 'Content-Type': event.target.files[0].type }
    axios.post(settings.server.addr + path, formData, headers)
        .then(
            res => {
                console.log(res);
                setLoad(false);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );
}

export default function Profile() {
    const [is_load, setLoad] = useState(false);
    const [image, setImage] = useState();

    const fileInputRef = useRef();
    const handleChange = (event) => {
        sendImageOnServer("/upload-image-on-profile/", event, setLoad)
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
        if (is_load) {
            return
        }

        axios.get(settings.server.addr + "/get-image-on-profile/" + localStorage.getItem("user_id"), {
            responseType: "arraybuffer"
        })
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setImage(base64)
            })
            .catch(err => {
                console.log(err);
            })
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
    }, [is_load]);


    return (
        <Card sx={{ borderRadius: "12px", width: "20vw", height: "45vh" }}>

            {!is_load ? (
                <Skeleton sx={{ height: "25vh" }} animation="wave" variant="rectangular" />
            ) : (
                <CardActionArea onClick={() => fileInputRef.current.click()}>
                    <CardMedia
                        sx={{ height: "25vh", resize: "horizontal" }}
                        src={`data:image/jpeg;charset=utf-8;base64,${image}`}
                        title="user"
                        component="img"
                    />
                    <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg" hidden />
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