import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const ImageUploadViewer = ({ file, startUpload, disabled }) => {
    
    const [imageStatus, setImageStatus] = useState(true);
    const imageRef = useRef(null);
    const [image, setImage] = useState("");

    useEffect(() => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        };
    }, []);

    useEffect(() => {
        if (!startUpload) return;
        if (!imageStatus) return;
        
        sendImage(localStorage.getItem("last_project_id"));
        console.log("upload start");
        console.log(file);
    }, [startUpload]);

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
                console.log('Файл не отправлен');
                // throw new Error('Ошибка при отправке файла');
            }
        } catch (err) {
            console.error(err);
            // throw err;
        }
    };

    const sendImage = async (project_id) => {
        try {
            const formData = new FormData(); // Создаем объект FormData для отправки файла
            formData.append(
                "file",
                file,
                file.name
            );

            await sendImageOnServer('/upload_image_in_project/' + project_id, formData); // Отправка файла на сервер
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при загрузке фото');
        }
    };

    return (
        <Box position="relative">
            <Card>
                <CardActionArea
                    disabled={disabled}
                    onClick={() => {
                        setImageStatus(!imageStatus);
                        if(imageStatus){
                        localStorage.setItem("canceled_image_count", JSON.parse(localStorage.getItem("canceled_image_count")) + 1);
                        }
                        else{
                        localStorage.setItem("canceled_image_count", JSON.parse(localStorage.getItem("canceled_image_count")) - 1);    
                        }
                    }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 15,
                    }}>
                        {imageStatus ? <CheckBoxIcon fontSize="large" /> : <CheckBoxOutlineBlankIcon fontSize="large" />}

                    </Box>
                    <CardMedia
                        key={image}
                        ref={imageRef}
                        component="img"
                        src={image}
                        alt="Фотография"
                        sx={{
                            width: '100%',   // Ширина фотографии — 100% ширины контейнера
                            height: 'auto',  // Высота автоматически адаптируется под ширину
                            objectFit: 'contain',  // Подгоняем картинку без искажений
                            display: 'block',
                            margin: '0 auto'  // Центрируем изображение горизонтально
                        }}
                    />
                </CardActionArea>
            </Card>
        </Box>
    );
}


export default ImageUploadViewer;