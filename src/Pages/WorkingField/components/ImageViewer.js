import { CardMedia } from "@mui/material";
import settings from "../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';




const ImageViewer = ({ setCanvasSize }) => {
    const imageRef = useRef(null);
    // const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState();

    useEffect(() => {
        // if(isLoading!=false){

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${1}?t=${Date.now()}`, {
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
                // setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        // }
    }, []);

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