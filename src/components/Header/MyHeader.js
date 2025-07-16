import React from 'react'
import Box from '@mui/material/Box';
import { SvgIcon, Button, IconButton, Card } from "@mui/material";
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';

export default function MyHeader({ selectedTheme, changeTheme }) {
    const [cookies, setCookie] = useCookies(['role', 'user', 'my_theme']);

    const [inAccount] = useState(() => {
        if (cookies.user === undefined) {
            setCookie('user', 0, { path: '/' });
        }
        return cookies.user;
    });

    function LoginLabel() {
        if (selectedTheme) {
            if (inAccount) {
                return (
                    <Button sx={{ color: "#000000" }} onClick={() => { navigate('/logout'); }}>
                        <Typography variant="h7" gutterBottom>Выйти</Typography>
                    </Button>
                );
            }
            else {
                return (
                    <Button sx={{ color: "#000000" }} onClick={() => { navigate('/login'); }}>
                        <Typography variant="h7" gutterBottom>Войти</Typography>
                    </Button>
                );
            }
        }
        else {
            if (inAccount) {
                return (
                    <Button sx={{ color: "#FFFFFF" }} onClick={() => { navigate('/logout'); }}>
                        <Typography variant="h7" gutterBottom>Выйти</Typography>
                    </Button>
                );
            }
            else {
                return (
                    <Button sx={{ color: "#FFFFFF" }} onClick={() => { navigate('/login'); }}>
                        <Typography variant="h7" gutterBottom>Войти</Typography>
                    </Button>
                );
            }
        }
    }



    function RenderLogo() {
        if (cookies.my_theme === false) {
            return (
                <Box sx={{ border: '2px solid rgb(255, 255, 255)', borderRadius: "30px" }}>
                    <IconButton sx={{ height: 40, width: 40 }} onClick={() => { navigate('/'); }} >
                        <GTranslateOutlinedIcon />
                    </IconButton>
                </Box>
            );
        }
        if (cookies.my_theme === true) {
            return (
                <Box sx={{ border: '2px solid rgb(0, 0, 0)', borderRadius: "30px" }}>
                    <IconButton sx={{ height: 40, width: 40 }} onClick={() => { navigate('/'); }} >
                        <GTranslateOutlinedIcon />
                    </IconButton>
                </Box>
            );
        }
    }

    function RenderSocialNetworks() {
        if (cookies.my_theme) {
            return (
                <Box component="span">

                    <a href='https://vk.com/id454241763'>
                        <IconButton sx={{ border: '3.5px solid rgb(0, 0, 0)', borderRadius: "30px", height: 40, width: 40 }} >
                            <SvgIcon sx={{ height: 40, width: 40 }}>
                                <svg fill="#000000" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.692 10.831s.849.838 1.058 1.227c.006.008.009.016.011.02.085.143.105.254.063.337-.07.138-.31.206-.392.212h-1.5c-.104 0-.322-.027-.586-.209-.203-.142-.403-.375-.598-.602-.291-.338-.543-.63-.797-.63a.305.305 0 0 0-.095.015c-.192.062-.438.336-.438 1.066 0 .228-.18.359-.307.359h-.687c-.234 0-1.453-.082-2.533-1.221-1.322-1.395-2.512-4.193-2.522-4.219-.075-.181.08-.278.249-.278h1.515c.202 0 .268.123.314.232.054.127.252.632.577 1.2.527.926.85 1.302 1.109 1.302a.3.3 0 0 0 .139-.036c.338-.188.275-1.393.26-1.643 0-.047-.001-.539-.174-.775-.124-.171-.335-.236-.463-.26a.55.55 0 0 1 .199-.169c.232-.116.65-.133 1.065-.133h.231c.45.006.566.035.729.076.33.079.337.292.308 1.021-.009.207-.018.441-.018.717 0 .06-.003.124-.003.192-.01.371-.022.792.24.965a.216.216 0 0 0 .114.033c.091 0 .365 0 1.107-1.273a9.718 9.718 0 0 0 .595-1.274c.015-.026.059-.106.111-.137a.266.266 0 0 1 .124-.029h1.781c.194 0 .327.029.352.104.044.119-.008.482-.821 1.583l-.363.479c-.737.966-.737 1.015.046 1.748z" />
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </a>
                    <Box component="span" sx={{ marginLeft: "0.25vw" }}></Box>
                    <a href='https://t.me/artem_molokeev'>
                        <IconButton sx={{ border: '3.5px solid rgb(0, 0, 0)', borderRadius: "30px", height: 40, width: 40 }}>
                            <SvgIcon sx={{ height: 40, width: 40 }}>
                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415 22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 9.38244Z" stroke="#000000" stroke-linejoin="round" />
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </a>
                    <Box component="span" sx={{ marginLeft: "0.4vw" }}></Box>
                    <IconButton sx={{ height: 40, width: 40 }}
                        onClick={() => {
                            changeTheme();
                        }}
                    >
                        <SvgIcon>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#000000" />
                            </svg>
                        </SvgIcon>
                    </IconButton>
                </Box>
            );
        }
        else {
            return (
                <Box component="span">
                    <a href='https://vk.com/id454241763'>
                        <IconButton sx={{ border: '3.5px solid rgb(255, 255, 255)', borderRadius: "30px", height: 40, width: 40 }} >
                            <SvgIcon sx={{ height: 40, width: 40 }}>
                                <svg fill="#FFFFFF" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.692 10.831s.849.838 1.058 1.227c.006.008.009.016.011.02.085.143.105.254.063.337-.07.138-.31.206-.392.212h-1.5c-.104 0-.322-.027-.586-.209-.203-.142-.403-.375-.598-.602-.291-.338-.543-.63-.797-.63a.305.305 0 0 0-.095.015c-.192.062-.438.336-.438 1.066 0 .228-.18.359-.307.359h-.687c-.234 0-1.453-.082-2.533-1.221-1.322-1.395-2.512-4.193-2.522-4.219-.075-.181.08-.278.249-.278h1.515c.202 0 .268.123.314.232.054.127.252.632.577 1.2.527.926.85 1.302 1.109 1.302a.3.3 0 0 0 .139-.036c.338-.188.275-1.393.26-1.643 0-.047-.001-.539-.174-.775-.124-.171-.335-.236-.463-.26a.55.55 0 0 1 .199-.169c.232-.116.65-.133 1.065-.133h.231c.45.006.566.035.729.076.33.079.337.292.308 1.021-.009.207-.018.441-.018.717 0 .06-.003.124-.003.192-.01.371-.022.792.24.965a.216.216 0 0 0 .114.033c.091 0 .365 0 1.107-1.273a9.718 9.718 0 0 0 .595-1.274c.015-.026.059-.106.111-.137a.266.266 0 0 1 .124-.029h1.781c.194 0 .327.029.352.104.044.119-.008.482-.821 1.583l-.363.479c-.737.966-.737 1.015.046 1.748z" />
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </a>
                    <Box component="span" sx={{ marginLeft: "0.25vw" }}></Box>
                    <a href='https://t.me/artem_molokeev'>
                        <IconButton sx={{ border: '3.5px solid rgb(255, 255, 255)', borderRadius: "30px", height: 40, width: 40 }}>
                            <SvgIcon sx={{ height: 40, width: 40 }}>
                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415 22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 9.38244Z" stroke="#FFFFFF" stroke-linejoin="round" />
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </a>
                    <Box component="span" sx={{ marginLeft: "0.4vw" }}></Box>

                    <IconButton sx={{ height: 40, width: 40 }}
                        onClick={() => {
                            changeTheme();
                        }}
                    >
                        <SvgIcon>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFFFFF" />
                            </svg>
                        </SvgIcon>
                    </IconButton>
                </Box>
            );
        }
    }

    function RenderRightPanel() {
        if (cookies.my_theme) {
            return (
                <Box component="div" sx={{ marginLeft: 8, display: 'inline' }}>
                    <Button sx={{ color: "#000000" }} onClick={() => { navigate('/projects'); }}><Typography variant="h7" gutterBottom>Проекты</Typography></Button>
                    <Button sx={{ color: "#000000" }} onClick={() => { navigate('/profile'); }}><Typography variant="h7" gutterBottom>Профиль</Typography></Button>
                    <Button sx={{ color: "#000000" }} onClick={() => { navigate('/about'); }}><Typography variant="h7" gutterBottom>О нас</Typography></Button>
                    <LoginLabel />
                </Box>
            );
        }
        else {
            return (
                <Box component="div" sx={{ marginLeft: 8, display: 'inline' }}>
                    <Button sx={{ color: "#FFFFFF" }} onClick={() => { navigate('/projects'); }}><Typography variant="h7" gutterBottom>Проекты</Typography></Button>
                    <Button sx={{ color: "#FFFFFF" }} onClick={() => { navigate('/profile'); }}><Typography variant="h7" gutterBottom>Профиль</Typography></Button>
                    <Button sx={{ color: "#FFFFFF" }} onClick={() => { navigate('/about'); }}><Typography variant="h7" gutterBottom>О нас</Typography></Button>
                    <LoginLabel />
                </Box>
            );
        }
    }

    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card variant="outlined" sx={{ width: '51.05vw', borderRadius: "0 0 12px 12px" }}>
                <Box
                    display="flex"
                    alignItems="center"
                    minHeight="10vh"
                >
                    <Box component="div" sx={{ marginLeft: 4, display: 'inline' }}>
                            <RenderLogo />
                        </Box>
                    <Box
                        minWidth="25%"
                    >
                        <Box component="div" sx={{ marginLeft: 0.5, display: 'inline' }}>
                            <RenderSocialNetworks />
                        </Box>
                    </Box>
                    <Box sx={{ width: "80%", display: "flex", justifyContent: "right" }}>
                        <Box component="div" sx={{ marginLeft: 0.5, marginRight: 4, display: 'inline' }}>
                            <RenderRightPanel />
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}
