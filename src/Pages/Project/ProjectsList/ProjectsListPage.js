import { Box, Card, CardContent, Fab, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import settings from "../../../settings.json"
import ProjectViewComponent from './components/ProjectViewComponent';
import InvitationDialog from '../ProjectsPage/components/InvitationDialog';


export default function ProjectsListPage({ purpose = "inside" }) {
    const navigate = useNavigate();
    const [listProjects, setListProjects] = useState([]);


    async function getListOfProjects() {
        let url = purpose == "inside" ? "/get-projects-ids/" : "/get-outside-projects-ids/";

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
                {purpose == "inside" ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginBottom: '1.85vh', marginTop: '1.85vh' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                                    Сторонние проекты
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <InvitationDialog />
                            </Box>
                            <CardContent>
                            </CardContent>
                        </Card>
                    </>
                )}

            </Box>
            <Box sx={{ maxWidth: "51.05vw" }}>
                <Grid container spacing="1.85vh">
                    {listProjects.map((item, index) => (
                        <Grid size={6}>
                            <ProjectViewComponent project_id={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    );
}