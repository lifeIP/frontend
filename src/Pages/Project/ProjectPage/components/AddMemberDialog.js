import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function AddMemberDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab color="primary" size="large" aria-label="добавить участник" onClick={handleClickOpen}>
          <AddIcon />
      </Fab>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Поисковая строка</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="search-input" label="Введите запрос..." fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button color="primary">Искать</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}