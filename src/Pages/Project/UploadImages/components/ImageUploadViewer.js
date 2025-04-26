import { Box, Card, CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';




const ImageUploadViewer = ({file, startUpload}) => {
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

    useEffect(()=>{
        if(!startUpload)return;
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
                throw new Error('Ошибка при отправке файла');
            }
        } catch (err) {
            console.error(err);
            throw err;
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
        <Box>
            <Card>
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

            </Card>
        </Box>
    );
}


export default ImageUploadViewer;