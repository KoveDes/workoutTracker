import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Divider, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import CustomInput, {CustomRadio} from "./CustomInputs.jsx";
import {Form, Formik} from "formik";
import profileSchema from "../schemas/profileSchema.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PasswordDialog from "./PasswordDialog";
import useAuth from "../hooks/useAuth.js";

export const AccountProfileDetails = ({user, setChange}) => {
    const [error, setError] = useState();
    const {setUser} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    delete user._id;
    const handleSubmit = async (values, actions) => {
        try {
            await new Promise(res => setTimeout(res, 2000))
            const response = await axiosPrivate.patch('/user', {
                ...values
            })
            setUser({gender: values.gender, username: values.username})
            setChange(s => !s);
        } catch (e) {
            setError('invalid server response');
        }
    }

    return (
        <>
            {error ? <div>{error}</div> : null}
            <Formik
                enableReinitialize={true}
                initialValues={{
                    email: user?.email || '',
                    username: user?.username || '',
                    age: user?.age || '',
                    gender: user?.gender || '',
                }}
                validationSchema={profileSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (<Form>
                    <Card>
                        {/*<CardHeader*/}
                        {/*    title="Profile"*/}
                        {/*/>*/}
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <CustomInput
                                            type='email'
                                            label='Email'
                                            name='email'
                                            // autoFocus
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <CustomInput
                                            label='Username'
                                            name='username'
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <CustomInput
                                            name='age'
                                            label="Age"
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
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
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'flex-end'}}>
                            <Button
                                sx={{display: 'flex'}}
                                // startIcon={props.isSubmitting ? <CircularProgress size={0.01} /> : null}
                                disabled={props.isSubmitting}
                                type='submit' variant="outlined">
                                {props.isSubmitting ? 'Saving' : "Save details"}
                            </Button>
                        </CardActions>
                    </Card>

                </Form>)}

            </Formik>
            <PasswordDialog/>

        </>
    );
};