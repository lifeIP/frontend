import { Box, Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import MinimumDistanceSlider from './MinimumDistanceSlider';
import { useNavigate } from 'react-router';

export default function TaskManagement() {
    const navigate = useNavigate()
    const [userRights, setUserRights] = useState(2);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Открывает/закрывает модальное окно
    const [verificationCode, setVerificationCode] = useState(''); // Хранит введённый пользователем код
    const [generatedCode, setGeneratedCode] = useState(Math.floor(1000 + Math.random() * 9000)); // Генерирует случайный 4-значный код

    useEffect(() => {
        setUserRights(JSON.parse(localStorage.getItem("user_rights")));
        setGeneratedCode(Math.floor(1000 + Math.random() * 9000));
    }, []);

    // Функционал закрытия модального окна
    const closeModal = () => {
        setOpenConfirmDialog(false);
        setVerificationCode('');
    };

    // Обработчик проверки кода и дальнейшего действия
    const confirmAction = () => {
        if (verificationCode.trim().toString() === generatedCode.toString()) {
            // Если код верный, закрыть окно и провести дальнейшие действия
            closeModal();
            navigate("/project");
            alert('Фотографии успешно добавлены в датасет!');
        } else {
            alert('Неправильный код подтверждения!');
        }
    };

    // Логика открытия модального окна при нажатии кнопки
    const handleAddToDataset = () => {
        setOpenConfirmDialog(true);
    };

    return (
        <Card sx={{
            borderRadius: "12px",
            width: "51.05vw",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
        }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center" fontWeight="bold">
                    Управление
                </Typography>
                <Typography>
                    Вы имеете доступ: {userRights == 0 ? "АДМИНИСТРАТОР" : ""}{userRights == 1 ? "КОНТРОЛЁР" : ""}{userRights == 2 ? "РАБОЧИЙ" : ""}
                </Typography>
                {userRights <= 1 && (
                    <>
                        <Typography>
                            Распределение классов в датасете
                        </Typography>
                        <Typography>
                            Разделение датасета на train/test/valid
                        </Typography>
                        <MinimumDistanceSlider />
                        <Button fullWidth variant='contained' onClick={handleAddToDataset}>
                            Добавить в датасет
                        </Button>
                    </>
                )}
                {userRights === 2 && (
                    <Box marginTop='1.85vh'>
                        <Button fullWidth variant='contained'>
                            Отправить на проверку
                        </Button>
                    </Box>
                )}

                {/* Всплывающее окно подтверждения */}
                <Dialog open={openConfirmDialog} onClose={closeModal}>
                    <DialogTitle>Добавление размеченных фотографии в датасет</DialogTitle>
                    <DialogContent>
                        <Typography mb={2}>
                            Все неразмеченные фотографии будут удалены безвозвратно. 
                            Для подтверждения введите следующий код: {generatedCode}
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Код подтверждения"
                            type="number"
                            fullWidth
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmAction} color="primary">Подтвердить</Button>
                        <Button onClick={closeModal} color="secondary">Отмена</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}