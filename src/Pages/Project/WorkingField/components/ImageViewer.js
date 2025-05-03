import { CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';




const ImageViewer = ({ setCanvasSize, image }) => {
    const imageRef = useRef(null);
    
    return (
        <CardMedia
            key={image}
            ref={imageRef}
            component="img"
            onLoad={() => {
                setCanvasSize({
                    width: imageRef.current.width,
                    height: imageRef.current.height
                });
            }}
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
    );
}


export default ImageViewer;