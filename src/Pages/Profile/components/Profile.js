import settings from "../../../settings.json"
import axios from 'axios'
import { useNavigate } from 'react-router'

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


function ProfileImage() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState();

    const fileInputRef = useRef();

    const handleChange = async (event) => {
        try {
            const formData = new FormData(); // Создаем объект FormData для отправки файла
            formData.append(
                "file",
                event.target.files[0],
                event.target.files[0].name
            );
            
            await sendImageOnServer('/upload-image-on-profile/', formData); // Отправка файла на сервер
            
            setLoading(true);
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при загрузке фото');
        }
    };

    const sendImageOnServer = async (url, formData) => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 || res.status === 201) {
                console.log('Файл успешно отправлен!');
            } else {
                throw new Error('Ошибка при отправке файла');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    

    useEffect(() => {
        if(isLoading!=false){
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-on-profile/${localStorage.getItem('user_id')}?t=${Date.now()}`, {
            responseType: "arraybuffer"
        })
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setImage(`data:image/jpeg;charset=utf-8;base64,${base64}`);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [isLoading]);


    
    if (isLoading) {
        return <Skeleton sx={{ height: "25vh" }} animation="wave" variant="rectangular" />;
    }

    return (
        <CardActionArea onClick={() => fileInputRef.current.click()}>
            <CardMedia
                // key={image}
                sx={{ height: "25vh", resize: "horizontal" }}
                image={image}
                title="user"
                component="img"
            />
            <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".jpg, .png, .jpeg" hidden />
        </CardActionArea>
    );
}

export default function Profile() {
    const [is_load, setLoad] = useState(false);


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

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
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
            <ProfileImage />
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
                    <Button disabled aria-label="edit">
                        <EditRoundedIcon size="smal" /> ИЗМЕНИТЬ
                    </Button>
                )}
            </CardActions>
        </Card>

    );
}