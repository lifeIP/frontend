import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import settings from "../../../../settings.json"
import axios from 'axios';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import { useNavigate } from "react-router";




const ImageViewerPagination = ({setImageId, image_id, setIsLoaded, dst="list_of_not_marked_up_ids_images_task" }) => {
    const navigate = useNavigate();


    const canvasRef = useRef(null);

    const imageRef = useRef(null);
    // const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState();


    useEffect(() => {
        imageRef.current.src = null
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${image_id}?t=${Date.now()}`, {
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
            })
            .catch(err => {
                console.log(err);
            })
    }, [image_id]);



    return (
        <Box position="relative">

            <Card>
                <CardActionArea
                    onClick={()=>{
                        localStorage.setItem("working-field-image-id", image_id);
                        localStorage.setItem('rect_list', JSON.stringify([]));
                        localStorage.setItem('poligon_points_list', JSON.stringify([]));
                        localStorage.setItem("list_of_ids_images", localStorage.getItem("list_of_ids_images_task"));
                        localStorage.setItem("list_of_ids_images", localStorage.getItem(dst));
                        localStorage.setItem("task_flag", true);
                        setImageId(image_id);
                        setIsLoaded(true);
                    }}
                >
                    <CardMedia
                        key={image}
                        ref={imageRef}
                        component="img"
                        
                        src={image}
                        alt="Фотография"
                        sx={{
                            width: '100%',
                            height: '20vh',
                            objectFit: "contain",
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </CardActionArea>
            </Card>
        </Box>
    );
}


export default ImageViewerPagination;