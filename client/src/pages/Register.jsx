import React, {useState} from 'react';
import CustomInput, {CustomRadio, PasswordInput} from "../components/CustomInputs.jsx";
import {default as registerSchemaAuth, registerSchemaDetails} from "../schemas/registerSchema.js";
import {Alert, Box, Grid, Snackbar, Typography} from "@mui/material";
import FormikStepper from "../components/forms/FormikStepper.jsx";
import FormikStep from "../components/forms/FormikStep.jsx";
import axios from "../api/axios.js";
import {useNavigate} from "react-router-dom";

export function Register() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    return (<>
        <Typography variant='p' sx={{color: 'red', textAlign: 'center'}} >This site was deployed on a free platform. Give it a little time until everything loads</Typography>
        <Typography variant='h4' textAlign='center'>Registration</Typography>
        <FormikStepper
            submittingText='Creating an account...'
            submitText='Sign up'
            initialValues={{
                login: '',
                password: '',
                matchPassword: '',
                email: '',
                username: '',
                gender: '',
                age: '',
                height: '',
                weight: ''
            }}

            onSubmit={async (values) => {

                setError('');
                try {
                    await new Promise(res => setTimeout(() => {
                        res();
                    }, 1000))
                    await axios.post(
                        'register',
                        JSON.stringify(values),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                        }
                    );
                    navigate('/login');
                } catch ({response}) {
                    setError(response.status === 409 ? response.data.message : "Error!")
                }

            }}
        >
            <FormikStep
                validationSchema={registerSchemaAuth}
                label='Authorization'
            >
                <Box>
                    <CustomInput
                        type='text'
                        label='Login'
                        name='login'
                        placeholder='login'
                    />
                    <PasswordInput
                        label='Password'
                        name='password'
                        placeholder='password'
                    />
                    <PasswordInput
                        label='Confirm password'
                        name='matchPassword'
                        placeholder='password'/>
                </Box>
            </FormikStep>
            <FormikStep
                label='User information'
                validationSchema={registerSchemaDetails}
            >

                <Box sx={{width: '700px'}}>
                    <Grid
                        container
                        spacing={6}
                        justifyContent='center'

                    >
                        <Grid item xs={5.5}>
                            <CustomInput
                                type='email'
                                label='Email'
                                name='email'
                            />
                            <CustomInput
                                label='Username'
                                name='username'
                            />
                            <Grid
                                container gap={3} alignItems='flex-start' sx={{m: '10px 0'}}
                            >
                                <CustomRadio
                                    label='Male'
                                    name='gender'
                                    value='male'
                                />
                                <CustomRadio
                                    label='Female'
                                    name='gender'
                                    value='female'
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={5.5}>
                            <CustomInput
                                name='age'
                                label="Age"
                                type='number'

                            />
                            <CustomInput
                                name='height'
                                label="Height (cm)"
                                type='number'
                                adornment='cm'
                            />
                            <CustomInput
                                name='weight'
                                label="Weight (kg)"
                                type='number'
                                adornment='kg'
                            />
                        </Grid>
                    </Grid>
                </Box>

            </FormikStep>
        </FormikStepper>
        <Snackbar
            open={!!error}
            severity='true'
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            onClose={() => {
                error && setError('');
            }}
        >
            <Alert severity={'error'} sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    </>)
}

export default Register;