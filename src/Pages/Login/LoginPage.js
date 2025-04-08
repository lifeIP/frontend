import React from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useForm from '../../components/hooks/useForm'
import { useNavigate } from 'react-router'
import { Grid } from '@mui/material'
import axios from 'axios'
import settings from "../../settings.json"

const getFreshModel = () => ({
    email: '',
    password: '',
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

export default function LoginPage() {
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
        setErrors(temp)
        return Object.values(temp).every(x => x === "")
    }

    const login = e => {
        e.preventDefault();
        if (validate()) {
            axios.post(settings.server.addr + "/login/", values)
                .then(res => {
                    console.log(res);
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);
                    localStorage.setItem('user_id', res.data.user_id);

                    localStorage.setItem('Authorization', "Bearer " + res.data.access_token);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
                    navigate("/")
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Войти
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                

                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ВОЙТИ</Button>
                        </form>
                    </Box>
                    <Button onClick={() => { navigate("/registration") }}>Регистрация</Button>
                </CardContent>
            </Card>
        </Center>
    );
}