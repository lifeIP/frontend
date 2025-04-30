import { CardActionArea, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProjectCardPreview from '../../CreateProject/components/ProjectCardPreview';
import axios from 'axios';
import settings from "../../../../settings.json"
import { useNavigate } from 'react-router';

export default function ProjectViewComponent({project_id}) {
    const navigate = useNavigate();
    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);


    async function getInfoOfProjects() {
        let url = "/get-projects-info-by-id/" + project_id;

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                // setListProjects(res.data);
                // console.log(res.data);
                setPrjctName(res.data.name);
                setPrjctDescription(res.data.description);
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + project_id)
            .then(res => {
                let list_of_class_name = []
                
                res.data.map((item)=>{
                    list_of_class_name.push({label: item.class_name});
                })
                setRows(list_of_class_name);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            getInfoOfProjects();
    }, [])

    useEffect(() => {
       
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-projects-photo-preview-by-id/${project_id}?t=${Date.now()}`, {
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
        }
    , []);



    return (
        
        <ProjectCardPreview
            isImage={isImage}
            prjctName={prjctName}
            prjctDescription={prjctDescription}
            rows={rows}
            actionAreaDisabled={false}
            onClick={()=>{
                localStorage.setItem("last_project_id", project_id);
                navigate("/project");
            }}
        />
    );
}