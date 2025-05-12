import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Fab, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import settings from "../../../../settings.json"

export default function AddMemberDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(true);

  function addNewMember(member_email){
    const url = "/add_new_member_in_project/"
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
    axios.post(`${settings.server.addr}${url}`, {member_email: member_email}).then(res=>{
      if(res.data.status == 1){
        alert("Приглашение отправлено");
      }
    }).catch(err=>{
      console.log(err);
      alert("Что-то пошло не так. Попробуйте позже.");
    })
  }

  // Регулярное выражение для проверки email
  const validateEmail = (value) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(value.trim());
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      console.log(`Отправлен новый email: ${email}`);
      addNewMember(email);
      setOpen(false);
      setEmail('');
    } else {
      setIsValidEmail(false);
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setIsValidEmail(true);
  };

  return (
    <>
      <Fab color="primary" size="large" aria-label="Добавить участника" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Добавить участника</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="search-input"
            label="Email"
            error={!isValidEmail && !!email.length > 0}
            helperText={!isValidEmail ? 'Некорректный email!' : ''}
            fullWidth
            value={email}
            onChange={handleChangeEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button disabled={!isValidEmail} color="primary" onClick={handleSubmit}>
            Искать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}