import { Box, Card, CardContent, CircularProgress, Fab, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddMemberDialog from './AddMemberDialog';
import axios from 'axios';

import settings from '../../../../settings.json';

import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
function ListOfMembers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getAllMembersInProject() {
        let url = `/get_all_members_in_project/${JSON.parse(localStorage.getItem('last_project_id'))}`;
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            const res = await axios.get(`${settings.server.addr}${url}`);
            if (res.status === 200 || res.status === 201) {
                setData(res.data.members);
                setLoading(false);
            } else {
                console.error('Неверный статус ответа:', res.status);
            }
        } catch (err) {
            console.error('Ошибка загрузки:', err.message);
        }
    }

    useEffect(() => {
        getAllMembersInProject();
    }, []);

    return (
        <Card sx={{ width: "100%", borderRadius: "12px", height: "45vh" }}>
            <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
                <CardContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : data.length === 0 ? (
                        <Typography variant="body1" component="p" align="center" my={2}>
                            Нет участников.
                        </Typography>
                    ) : (
                        <List disablePadding sx={{overflowY: "auto", maxHeight: 300, '& ul': { padding: 0 },}}>
                            {data.map((item) => (

                                <ListItem
                                    key={item.id}
                                    button
                                    divider
                                    sx={{
                                        '&:hover': {
                                            // backgroundColor: '#f7f7f7',
                                            transition: '.3s ease-in-out',
                                        },
                                        py: 2,
                                        px: 2,
                                        borderRadius: '8px',
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <ListItemIcon>
                                        {item.user_rights == 0? <LooksOneOutlinedIcon/>:<></>}
                                        {item.user_rights == 1? <LooksTwoOutlinedIcon/>:<></>}
                                        {item.user_rights == 2? <Looks3OutlinedIcon/>:<></>}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                {item.name} {item.is_creator?"(creator)":<></>}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </CardContent>
                <Box sx={{ width: "100%", alignItems: "center", display: "flex", justifyContent: "center" }}>
                    <Box
                        sx={{
                            // width: "100%",
                            position: "absolute",
                            bottom: "10px",
                            // alignItems: "center",
                            // right: "0%",
                        }}
                    >
                        <AddMemberDialog />
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

export default ListOfMembers;