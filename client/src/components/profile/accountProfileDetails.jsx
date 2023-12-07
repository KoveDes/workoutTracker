import React, {useState} from 'react';
import {Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Unstable_Grid2 as Grid} from '@mui/material';
import CustomInput, {CustomRadio} from "../CustomInputs.jsx";
import {Form, Formik} from "formik";
import profileSchema from "../../schemas/profileSchema.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import CustomDialog from "../CustomDialog.jsx";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import LockedWithKey from '../../assets/Locked with Key.png'
import ChangePasswordForm from "../../forms/ChangePasswordForm.jsx";
import StyledButton from "../StyledButton.jsx";

export const AccountProfileDetails = ({user, setChange}) => {
    const [error, setError] = useState('');
    const {setUser} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const changePwd = useDropdownMenu();
    const handleSubmit = async (values) => {
        try {
            setError('');
            await new Promise(res => setTimeout(res, 1000))
            await axiosPrivate.patch('/user', {
                ...values
            });
            setUser({gender: values.gender, username: values.username})
            setChange(s => !s);
        } catch (e) {
            setError('Server error. Try again later');
        }
    }

    return (
        <>
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
                    <Card sx={{
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        p: '0 0 20px 0',
                    }}>
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    direction='column'
                                    gap={0.5}
                                >

                                    <CustomInput
                                        type='email'
                                        label='Email'
                                        name='email'
                                        // autoFocus
                                    />
                                    <CustomInput
                                        label='Username'
                                        name='username'
                                    />
                                    <CustomInput
                                        name='age'
                                        label="Age"
                                        type='number'
                                    />
                                    <Grid
                                        container gap={3} alignItems='flex-start'
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
                        <CardActions sx={{justifyContent: 'space-between'}}>
                            <Button
                                onClick={changePwd.handleOpen}
                                sx={{
                                    border: 'none',
                                    color: '#3b3b3f',
                                    "&:hover": {
                                        border: 'none',
                                    }
                                }}
                            >
                                <Grid container mt={0} gap={0.5} alignItems={'center'}>
                                    <img style={{width: 30}}
                                         src={LockedWithKey}
                                         alt="Locked with Key"/>
                                    Change Password
                                </Grid>
                            </Button>
                            <StyledButton
                                disabled={props.isSubmitting}
                                type='submit' >
                                {props.isSubmitting ? 'Saving' : "Save details"}
                            </StyledButton>

                        </CardActions>
                    </Card>

                </Form>)}

            </Formik>
            {changePwd.open ? (
                <CustomDialog
                    open={changePwd.open}
                    handleClose={changePwd.handleClose}
                    label='Change Password'
                    formId='pwdForm'
                    showButtons={true}
                >
                    <ChangePasswordForm/>
                </CustomDialog>
            ) : null}

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

        </>
    );
};