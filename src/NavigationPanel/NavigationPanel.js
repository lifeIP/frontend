import * as React from 'react';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Tooltip, CssBaseline, Box, IconButton, Badge, Avatar, Typography, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

export default function NavigationPanel() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget); // Устанавливаем элемент для появления попапа
    };

    const handleClosePopup = () => {
        setAnchorEl(null); // Скрываем popover
    };

    const username = "Алексей Иванов"; // имя пользователя, подставляйте своё значение

    const avatarInitials = username.charAt(0).toUpperCase();

    const menuItems = [
        { label: 'Dashboard', icon: <DashboardIcon />, link: '/', tooltip: 'Открыть dashboard' },
        { label: 'Profile', icon: <PersonIcon />, link: '/profile', tooltip: 'Просмотреть профиль' },
        { label: 'Messages', icon: <Badge badgeContent={4} color="error"><MailIcon /></Badge>, link: '/messages', tooltip: 'Новые сообщения' },
        { label: 'Settings', icon: <SettingsIcon />, link: '/settings', tooltip: 'Редактировать настройки' },
        { label: 'Notifications', icon: <Badge badgeContent={10} color="warning"><NotificationsIcon /></Badge>, link: '/notifications', tooltip: 'Уведомления' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none', md: 'block' } }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                variant="permanent"
                anchor="left"
                open={open}
                PaperProps={{
                    sx: {
                        width: open ? drawerWidth : 64,
                        overflowX: 'hidden',
                        transition: theme =>
                            theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                    },
                }}
            >

                <List sx={{ flexGrow: 1 }}>
                    <ListItem button sx={{ height: "60px" }}
                        onClick={handleDrawerToggle}
                    >
                        <Box display="flex" alignItems="center" justifyContent="center">
                            {open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </Box>
                    </ListItem>

                    {menuItems.map(({ label, icon, link, tooltip }, index) => (
                        <ListItem button key={label} sx={{ height: "60px" }}>
                            <Tooltip title={tooltip} placement="right-start" enterDelay={200} leaveDelay={100}>
                                <ListItemIcon>
                                    <Box sx={{
                                        display: 'flex', justifyContent: "center", alignItems: "center"
                                    }}>
                                        {icon}
                                    </Box>

                                </ListItemIcon>
                            </Tooltip>
                            {open && <ListItemText primary={label} />}
                        </ListItem>
                    ))}
                    <Divider />
                </List>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClosePopup}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box p={2}>
                        <Typography variant="h6">Профиль</Typography>
                        <Typography variant="body1">Привет, {username}.</Typography>
                        <Typography variant="body2">Здесь можно увидеть дополнительную информацию.</Typography>
                    </Box>
                </Popover>
                <List>
                    <ListItem button sx={{
                        height: "60px",
                    }}
                    onClick={handleAvatarClick}
                    >
                        <ListItemIcon >
                            <Box display="flex" alignItems="center" justifyContent="center" ml="-5px">
                                <Avatar>{avatarInitials}</Avatar>
                            </Box>
                        </ListItemIcon>
                        {open && <ListItemText primary={username} />}

                    </ListItem>
                </List>

            </Drawer>
        </Box>
    );
}