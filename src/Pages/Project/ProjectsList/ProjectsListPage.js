import { Box, Card, CardContent, Fab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import settings from "../../../settings.json"


export default function ProjectsListPage() {
    const navigate = useNavigate()
    const [listProjects, setListProjects] = useState([]);


    async function getListOfProjects() {
        let url = "/get-projects-id";

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
            const res = await axios.get(`${settings.server.addr}${url}`);

            if (res.status === 200 || res.status === 201) {
                setListProjects(res.data.ids);
                console.log(res.data);
            } else {
                throw new Error('Ошибка при отправке даннх');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        getListOfProjects();
    }, [])
    return (
        <>
            <Box sx={{ marginBottom: '1.85vh', marginTop: '1.85vh' }}>
                <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" textAlign="center">
                            Ваши проекты
                        </Typography>
                    </CardContent>


                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fab size="medium" aria-label="добавить класс" onClick={() => { navigate("/create-project") }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                    <CardContent>
                    </CardContent>
                </Card>
            </Box>
            {listProjects.map((item)=>(
                <Typography>{item}</Typography>
            ))}
        </>
    );
}