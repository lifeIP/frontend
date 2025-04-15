import React from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useNavigate } from 'react-router'
import { Grid } from '@mui/material'
import axios from 'axios'
import settings from "../../../settings.json"
import useForm from '../../../components/hooks/useForm'

const getFreshModel = () => ({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
})

function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}>
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function RegistrationPage() {
    const navigate = useNavigate()

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
        temp.password = values.password !== "" ? "" : "Это обязательное поле"
        temp.password2 = values.password === values.password2 ? "" : "Пароль не совпадает"
        setErrors(temp);
        return Object.values(temp).every(x => x === "")
    }

    const registration = e => {
        e.preventDefault();
        if (validate())
            axios.post(settings.server.addr + "/sign-up/", { 
        "email": values.email, 
        "first_name": values.first_name,
        "last_name": values.last_name, 
        "password": values.password,
        "patronymic": ""
    })
                .then(res => {
                    console.log(res);
                    navigate("/login")
                })
                .catch(err => {
                    console.log(err);
                });
    }

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Регистрация
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={registration}>
                            <TextField
                                label="Имя"
                                name="first_name"
                                type="first_name"
                                value={values.first_name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.first_name && { error: true, helperText: errors.first_name })} />
                            <TextField
                                label="Фамилия"
                                name="last_name"
                                type="last_name"
                                value={values.last_name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.last_name && { error: true, helperText: errors.last_name })} />
                            <TextField
                                label="Ваша почта*"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Пароль*"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <TextField
                                label="Повторите пароль*"
                                name="password2"
                                type="password"
                                value={values.password2}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password2 && { error: true, helperText: errors.password2 })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                        </form>
                    </Box>
                    <Button onClick={() => { navigate("/login") }}>Вход</Button>
                </CardContent>
            </Card>
        </Center>
    );
}


