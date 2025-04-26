import { Box, Card, CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';




const ImageUploadViewer = () => {
    const imageRef = useRef(null);
    const [image, setImage] = useState("");
   

    useEffect(() => {
        
    }, []);

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
                        height: '100%',  // Высота автоматически адаптируется под ширину
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