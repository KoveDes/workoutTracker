import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import CustomInput, {CustomCheckbox, PasswordInput} from "../components/CustomInputs.jsx";
import loginSchema from "../schemas/loginSchema.js";
import Button from "@mui/material/Button";
import {Alert, Box, Grid, Snackbar, Typography} from "@mui/material";
import {exerciseOptions, fetchRapidAPIData} from "../api/fetchRapidAPI.js";


function LoginForm() {
    const [error, setError] = useState(null);
    const {setAuth, setUser, setPersist} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    useEffect(() => {
        const controller = new AbortController();
        const fetchExercises = async () => {
            try {
                const storedExercises = sessionStorage.getItem('exercisesData');
                if (!storedExercises) {
                    const response = await fetchRapidAPIData(
                        'https://exercisedb.p.rapidapi.com/exercises?limit=4000',
                        exerciseOptions);
                    if (!controller.signal.aborted) {
                       sessionStorage.setItem('exercisesData', JSON.stringify(response?.data))
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchExercises();
        return () => controller.abort();
    }, []);

    const handleSubmit = async (values) => {
        setError(null);
        const {login, password, persist: formPersist} = values;
        try {
            const response = await axios.post(
                '/auth/login',
                JSON.stringify({login, password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({user: login, accessToken});
            setUser({gender: response?.data?.gender, username: response?.data?.username})
            setPersist(formPersist);
            localStorage.setItem('persist', formPersist)
            navigate(from, {replace: true});
        } catch ({response}) {
            if ([400, 401].includes(response.request.status)) {
                setError(response.data.message)
            } else {
                setError('Server error, try again later')
            }
        }
    }

    return (
        <Box>
            <Typography variant='h4' textAlign='center'>Login</Typography>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    persist: false,

                }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}>
                {(props) => (
                    <Form>
                        <Grid container direction='column'>
                            <CustomInput
                                type='text'
                                label='login'
                                name='login'
                                id='login'
                                placeholder='login'
                            />
                            <PasswordInput
                                label='Password'
                                name='password'
                                id='password'
                                placeholder='password'
                            />
                            <CustomCheckbox
                                label='Trust this device (24 hours)'
                                name='persist'
                                id='persist'
                            />
                            <Button
                                type='submit'
                                disabled={props.isSubmitting}
                                variant='text'
                                sx={{
                                    alignSelf: 'end',
                                    width: '150px',
                                    backgroundColor: '#3b3b3f',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#3b3b3f',
                                        opacity: 0.7,
                                    }
                                }}
                            >
                                {props.isSubmitting ? "Logging in..." : 'Log in'}
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
            {error ? (
                <Snackbar
                    open={!!error}
                    severity='true'
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setError('')}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        {error}
                    </Alert>
                </Snackbar>
            ) : null}
        </Box>
    )
}

export default LoginForm;