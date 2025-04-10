import { useState, useEffect } from 'react';
import { Card, CardMedia} from '@mui/material';


export default function ImageView({ id }) {
    const [imageUrl, setImageUrl] = useState('');

    // Эмуляция получения изображения с сервера
    // useEffect(() => {
    //     fetch('https://example.com/your-image-url') // Ваш API endpoint
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const objectURL = URL.createObjectURL(blob);
    //             setImageUrl(objectURL);
    //         })
    //         .catch(error => console.error('Error fetching image:', error));
    // }, []);

    return (
        <Card sx={{ width: "51.05vw" }}>
            <CardMedia
                component="img"
                image={"https://avatars.mds.yandex.net/i?id=f7454bc3badcefdfbef33cfd38fdc121_l-5194719-images-thumbs&n=13"}
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
    );
};
