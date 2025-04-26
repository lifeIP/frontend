import { Box, Card, CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';




const ImageViewer = () => {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });

    const imageRef = useRef(null);
    // const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState();


    const drawCanvas = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.lineWidth = 3;

            const path1 = new Path2D();
            context.strokeStyle = "#FF0000";
            path1.rect(20, 20, 100, 100)
            path1.closePath();    //  закрываем путь
            context.stroke(path1);
        }
    };


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
    }, []);

    useEffect(()=>{
        drawCanvas();
    }, [canvasSize]);


    return (
        <Box position="relative">
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 15,
                }}
            />
            <Card>
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


export default ImageViewer;