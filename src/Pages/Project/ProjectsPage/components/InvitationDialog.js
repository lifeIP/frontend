import * as React from 'react';
import { Button, ListItem, ListItemAvatar, Avatar, Typography, Dialog, DialogTitle, DialogContent, List, ListItemText, ListItemSecondaryAction, IconButton, Fab } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AddIcon from '@mui/icons-material/Add';


// Имитация данных приглашений
const initialInvitations = [
    { id: 1, sender: 'Иван Петров', project: 'Проект Alpha' },
    { id: 2, sender: 'Анна Смирнова', project: 'Проект Beta' },
];

export default function InvitationDialog() {
    const [invitations, setInvitations] = React.useState(initialInvitations);
    const [open, setOpen] = React.useState(false);

    // Функция обновления статуса приглашения
    const handleAcceptInvitation = (id) => {
        setInvitations((prevInvites) =>
            prevInvites.filter((invite) => invite.id !== id)
        );
    };

    const handleDeclineInvitation = (id) => {
        setInvitations((prevInvites) =>
            prevInvites.filter((invite) => invite.id !== id)
        );
    };

    // Функции управления окном
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab size="medium" aria-label="добавить класс" onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Новые приглашения</DialogTitle>
                <DialogContent>
                    <List dense>
                        {invitations.map((invite) => (
                            <ListItem key={invite.id}>
                                <ListItemAvatar>
                                    <Avatar>{invite.sender.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${invite.sender}`} secondary={`Проект "${invite.project}"`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="accept" onClick={() => handleAcceptInvitation(invite.id)}>
                                        <CheckCircleOutlineOutlinedIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="decline" onClick={() => handleDeclineInvitation(invite.id)}>
                                        <HighlightOffOutlinedIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}