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
                if (event.code === key) {
                    callback.current(event);
                } else if (key === 's' && event.key === 's') {
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
    useKey('s', () => console.log('S fired!'));

    useEffect(() => {

        localStorage.setItem('rect_list', JSON.stringify([]));
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
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + project_id)
            .then(res => {
                setDataMarkupClasses(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [project_id])

    const [stateEditing, setStateEditing] = useState(true);
    const [currentScale, setCurrentScale] = useState(1);
    const [selectedClass, setSelectedClass] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 });
    const [isSaved, setSaved] = useState(false);

    const CanvasOverImageComponent = memo(({ currentClass, currentScale, inBoundingBox, stateEditing, canvasSize, isSaved, setSaved }) => {
        return <CanvasOverImage
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