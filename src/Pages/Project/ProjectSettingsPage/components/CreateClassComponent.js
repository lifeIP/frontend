import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { HuePicker } from "react-color";
import { Box, Card, CardContent, Fab, TextField, Typography } from '@mui/material';



function CreateClassComponent({ rows, setRows }) {

    // Добавляем новую пустую строку
    const addNewRow = () => {
        setRows([{ id: Date.now(), label: '', color: '#000000', description: '' }, ...rows]);
    };

    // Обработчик изменения цвета строки
    const changeColor = (id, newColor) => {
        setRows(
            rows.map(row =>
                row.id === id ? { ...row, color: newColor } : row
            )
        );
    };

    // Обработчик изменения текста строки
    const changeLabel = (id, newLabel) => {
        setRows(
            rows.map(row =>
                row.id === id ? { ...row, label: newLabel } : row
            )
        );
    };

    const changeDescription = (id, newDescription) => {
        setRows(
            rows.map(row =>
                row.id === id ? { ...row, description: newDescription } : row
            )
        );
    };
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Fab size="medium" aria-label="добавить класс" onClick={addNewRow}>
                    <AddIcon />
                </Fab>
            </Box>
            <CardContent>
                <Box mt={2}>
                    {rows?.length > 0 && rows.map(row => (
                        <CardContent>
                            <Box key={row.id}>
                                <TextField
                                    disabled={row.disabled}
                                    sx={{ marginBottom: "15px", width: "23%", marginRight: "2%" }}
                                    value={row.label}
                                    placeholder="Название класса"
                                    onChange={event => changeLabel(row.id, event.target.value)}
                                />
                                <TextField
                                    disabled={row.disabled}
                                    sx={{ marginBottom: "15px", width: "58%", marginRight: "2%" }}
                                    value={row.description}
                                    placeholder="Краткое описание"
                                    onChange={event => changeDescription(row.id, event.target.value)}
                                />
                                <TextField
                                    disabled={row.disabled}
                                    sx={{ marginBottom: "15px", width: "15%", input: { color: row.color } }}
                                    color={row.color}
                                    value={row.color}
                                    placeholder="Цвет"
                                    onChangeComplete={event => changeColor(row.id, event.target.value)}
                                />

                                {row.disabled == true ? <></> :
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <HuePicker
                                            width="100%"
                                            color={row.color}
                                            onChange={color => changeColor(row.id, color.hex)}
                                            onChangeComplete={color => changeColor(row.id, color.hex)}
                                        />
                                    </Box>
                                }
                            </Box>

                        </CardContent>
                    ))}
                </Box>
            </CardContent>
        </>
    );
};

export default CreateClassComponent;