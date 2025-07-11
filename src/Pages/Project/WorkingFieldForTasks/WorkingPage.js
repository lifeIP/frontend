import {
    Box,
    CardContent,
    List,
    ListItemText,
    Skeleton,
    Typography
} from '@mui/material';

import React, {
    memo,
    useEffect,
    useState
} from 'react';

import Card from '@mui/material/Card';
import SmartMarkup from './components/SmartMarkup';
import Center from '../../../components/Center/Center'
import Hat from '../../../components/Hat/Hat';

import axios from 'axios';
import settings from "../../../settings.json"
import PhotoPagination from './components/PhotoPagination';
import TaskManagement from './components/TaskManagement/TaskManagement';


export default function WorkingFieldForTasks() {
    const [projectId, setProjectId] = useState(0);
    const [taskId, setTaskId] = useState(0);

    function getListOfImages(taskId, startIndex) {
        let url = "/get_task_images_list/" + taskId + "/" + startIndex;


        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}${url}`).then((res) => {

            if (res.status === 200 || res.status === 201) {
                // setListImages(res.data.ids);
                console.log(res.data);
                if(res.data.ids.length != 0){
                    localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: startIndex, ids: res.data.ids }));
                    localStorage.setItem("working-field-image-id", res.data.ids[0]);
                }
                console.log(res.data.ids);
            } else {
                // throw new Error('Ошибка при отправке данных');
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        localStorage.setItem('rect_list', JSON.stringify([]));
        localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: 1, ids: [] }));
        localStorage.setItem("list_of_ids_images_task", JSON.stringify({ startIndex: 1, ids: [] }));
        localStorage.setItem("list_of_marked_up_ids_images_task", JSON.stringify({ startIndex: 1, ids: [] }));
        localStorage.setItem("list_of_not_marked_up_ids_images_task", JSON.stringify({ startIndex: 1, ids: [] }));
        localStorage.setItem("task_flag", false);

        setProjectId(localStorage.getItem("last_project_id"));
        setTaskId(localStorage.getItem("last_task_id"));

        getListOfImages(localStorage.getItem("last_task_id"), 1);

    }, [])
    return (
        <Center>
            <Hat>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    Разметка
                </Typography>
            </Hat>

            <Box >
                <SmartMarkupComponent project_id={projectId} taskId={taskId}/>
            </Box>
        </Center>
    );
}

const SmartMarkupComponent = memo(({ project_id, taskId }) => {
    return <SmartMarkup project_id={project_id} taskId={taskId}/>
});