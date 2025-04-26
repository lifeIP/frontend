import { Typography } from '@mui/material';
import React, { useState } from 'react';
import ProjectCardPreview from '../../CreateProject/components/ProjectCardPreview';

export default function ProjectViewComponent() {
    const [isImage, setImage] = useState();
    const [prjctName, setPrjctName] = useState("Имя проекта");
    const [prjctDescription, setPrjctDescription] = useState("Краткое описание проекта, оно не должно превышать определённого количества символов.");
    const [rows, setRows] = useState([]);
    return (
        <ProjectCardPreview
            isImage={isImage}
            prjctName={prjctName}
            prjctDescription={prjctDescription}
            rows={rows}
        />
    );
}