import { Box, Button, Card, CardContent, Divider, Skeleton, Typography } from '@mui/material';
import React from 'react';

import { observer } from 'mobx-react';
import markUpStore from "../store/store";


function ClassesList() {
    return (
        <Box sx={{
            position: 'fixed',
            right: "5px",
            top: "23.8%",
            zIndex: 15,
            display: "flex",
            justifyContent: "left",
        }}>
            <Card sx={{ borderRadius: "12px" }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h4'
                        align='center'
                        color={markUpStore.class_color}
                    >Список</Typography>

                    {
                        markUpStore.classes_list.map((item, index) => {
                            if(item.id === -1) return <Skeleton  animation="wave" variant="rectangular" />;
                            return (
                                <Box>
                                    <Divider />
                                    <Button onClick={() => {
                                        markUpStore.selectClassById(index);
                                        console.log(index);
                                    }}>
                                        <Typography
                                            color={item.class_color}
                                        >
                                            {item.class_name}
                                        </Typography>
                                    </Button>
                                </Box>
                            );
                        }
                        )
                    }
                </CardContent>
            </Card>
        </Box>
    );
}

export default observer(ClassesList);