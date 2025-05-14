import React from 'react';
import { Select, MenuItem, TextField, Button, Box, Typography } from '@mui/material';

const TaskForm = ({ recipients, setAssigneeUserId }) => {
  const [selectedRecipient, setSelectedRecipient] = React.useState('myself');
  const [taskDescription, setTaskDescription] = React.useState('');
  
  // Обработчик выбора получателя
  const handleChangeRecipient = (event) => {
    setSelectedRecipient(event.target.value);
  };

  // Обработчик изменения поля описания задания
  const handleChangeDescription = (event) => {
    if (event.target.value.length <= 500) {
      setTaskDescription(event.target.value);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      {/* Поле выбора получателя */}
      <Typography variant="h6">Выберите получателя:</Typography>
      <Select fullWidth value={selectedRecipient} onChange={handleChangeRecipient}>
        <MenuItem value="" disabled>-- Выберите получателя --</MenuItem>
        {recipients.map((recipient) => (
          <MenuItem onClick={()=>{setAssigneeUserId(recipient.id)}} key={recipient.id} value={recipient.name}>{recipient.name}</MenuItem>
        ))}
        <MenuItem value="myself">Сам себе</MenuItem>
      </Select>
      
      {/* Поле ввода описания задания */}
      <Typography variant="h6">Описание задания:</Typography>
      <TextField
        label="Описание задания"
        multiline
        rows={4}
        maxLength={500}
        helperText={`${taskDescription.length}/500`}
        error={taskDescription.length > 500}
        fullWidth
        value={taskDescription}
        onChange={handleChangeDescription}
      />

      {/* Кнопка отправки формы */}
      <Button type="submit" color="primary" disabled={!selectedRecipient || taskDescription.length === 0}>Отправить задание</Button>
    </Box>
  );
};

export default TaskForm;