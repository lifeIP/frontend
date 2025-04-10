import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';


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
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Название Карточки
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Описание карточки
                </Typography>
            </CardContent>

            <CardMedia
                component="img"
                image={"https://static1.cbrimages.com/wordpress/wp-content/uploads/2025/04/1e85f85b-ec22-4aff-9ad7-998b018ddd25.jpeg"}
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
