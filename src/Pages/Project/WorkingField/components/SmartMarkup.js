import settings from "../../../../settings.json"
import {
    Box,
    Card,
} from '@mui/material';

import React, {
    memo,
    useEffect,
    useRef,
    useState
} from 'react';

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

import Actions from './Actions';
import ClassesList from './ClassesList';
import axios from 'axios';
import ImageViewer from "./ImageViewer";
import CanvasOverImage from "./CanvasOverImage";




export default function SmartMarkup({ project_id }) {
    const mainRef = useRef(null);
    const [inBoundingBox, setInBoundingBox] = useState(true);

    function useKey(key, cb) {
        const callback = useRef(cb);

        useEffect(() => {
            callback.current = cb;
        })


        useEffect(() => {
            function handle(event) {
                // console.log(event.code);
                if (event.code === key) {
                    callback.current(event);
                } else if (key === 's' && event.key === 's') {
                    callback.current(event);
                } else if (key === 'a' && event.key === 'a') {
                    callback.current(event);
                } else if (key === 'd' && event.key === 'd') {
                    callback.current(event);
                }
                else if (key === 'ShiftLeft' && event.key === 'ShiftLeft') {
                    callback.current(event);
                }
                else if (key === 'ControlLeft' && event.key === 'ControlLeft') {
                    callback.current(event);
                }
            }

            document.addEventListener('keydown', handle);
            return () => document.removeEventListener("keydown", handle)
        }, [key])
    }

    const handleMouseMove = (event) => {
        if (!mainRef.current) return;

        const rect = mainRef.current.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;

        if (relativeX > 0 && relativeX < mainRef.current.clientWidth
            && relativeY > 0 && relativeY < mainRef.current.clientHeight) {
            setInBoundingBox(true);
        }
        else {
            setInBoundingBox(false);
        }
    };

    async function saveMask() {
        console.log('S fired!');

        let url = "/set_mask_on_image/" + localStorage.getItem("working-field-image-id");
        let data = {
            forms: JSON.parse(localStorage.getItem('rect_list')),
            canvasWidth: canvasSize.width,
            canvasHeight: canvasSize.height
        }
        console.log(data);

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.post(`${settings.server.addr}${url}`, data);

            if (res.status === 200 || res.status === 201) {
                // console.log(res.data);
                // sendProjectImage(res.data.id);
                // localStorage.setItem("last_project_id", res.data.id);
                // console.log('Проект успешно создан!');

            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(data);
            console.error(err);
            throw err;
        }
    }

    useKey('s', () => saveMask());
    useKey('a', () => console.log('A fired!'));
    useKey('d', () => console.log('D fired!'));
    useKey('ShiftLeft', () => {
        setStateEditing(true);
        console.log('shift fired!')
    });
    useKey('ControlLeft', () => {
        setStateEditing(false);
        console.log('control fired!')
    });
    
    
    useEffect(() => {

        localStorage.setItem('rect_list', JSON.stringify([]));
        localStorage.setItem("now_is_last_list", false);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [])



    const [data_markup_classes, setDataMarkupClasses] = useState([{
        id: -1,
        class_name: "item",
        class_color: "#FF0000"
    }]);
    // Загрузка информации о проекте
    useEffect(() => {
        if (project_id === 0) return
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + project_id)
            .then(res => {
                setDataMarkupClasses(res.data);
                // console.log(res.data);
            })
            .catch(err => {
                // console.log(err);
            })

    }, [project_id])

    const [stateEditing, setStateEditing] = useState(true);
    const [currentScale, setCurrentScale] = useState(1);
    const [selectedClass, setSelectedClass] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });
    const [isSaved, setSaved] = useState(false);

    const CanvasOverImageComponent = memo(({ data_markup_classes, currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, isSaved, setSaved }) => {
        return <CanvasOverImage
            data_markup_classes={data_markup_classes}
            currentClass={currentClass}
            currentScale={currentScale}
            inBoundingBox={inBoundingBox}
            stateEditing={stateEditing}
            canvasSize={canvasSize}
            setSaved={setSaved}
            isSaved={isSaved}
        />
    });
    return (
        <Card sx={{ width: "51.05vw" }} ref={mainRef}>
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                <TransformWrapper
                    disabled={stateEditing}
                    onTransformed={(e) => {
                        setCurrentScale(e.state.scale);
                    }}
                >
                    <TransformComponent>
                        <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                            <Card sx={{ width: "51.05vw" }}>
                                <ImageViewer setCanvasSize={setCanvasSize} />
                                <CanvasOverImageComponent
                                    data_markup_classes={data_markup_classes}
                                    currentClass={data_markup_classes.at(selectedClass)}
                                    currentScale={currentScale}
                                    inBoundingBox={inBoundingBox}
                                    canvasSize={canvasSize}
                                    stateEditing={stateEditing}
                                    setSaved={setSaved}
                                    isSaved={isSaved} />

                            </Card>
                        </Box>
                    </TransformComponent>
                </TransformWrapper>
            </Box>
            <Actions setStateEditing={setStateEditing} />
            <ClassesList
                selectedClass={selectedClass}
                data_markup_classes={data_markup_classes}
                setSelectedClass={setSelectedClass} />
        </Card>
    );
}