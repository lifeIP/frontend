import { Box, Button, Card, CardContent, Divider, Skeleton, Typography } from '@mui/material';
import React from 'react';


export default function ClassesList({ data_markup_classes, setSelectedClass, selectedClass }) {
    return (
        <Box sx={{
            position: 'fixed',
            left: "76.5%",
            top: "23.8%",
            zIndex: 10,
            display: "flex",
            justifyContent: "left",
        }}>
            <Card sx={{ borderRadius: "12px" }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h4'
                        align='center'
                        color={data_markup_classes.at(selectedClass).class_color}
                    >Список</Typography>

                    {
                        data_markup_classes.map((item, index) => {
                            if(item.id === -1) return <Skeleton  animation="wave" variant="rectangular" />;
                            return (
                                <Box>
                                    <Divider />
                                    <Button onClick={() => {
                                        setSelectedClass(index);
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