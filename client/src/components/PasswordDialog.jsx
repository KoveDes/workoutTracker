import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Divider, Unstable_Grid2 as Grid} from "@mui/material";
import {Form, Formik} from "formik";
import {PasswordInput} from "./CustomInputs.jsx";
import passwordSchema from "../schemas/passwordSchema.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

function ChangePasswordForm({setError, setSubmitting, setSuccess: setOk}) {
    const [success, setSuccess] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async (values, actions) => {
        setError('');
        setOk(false);
        setSubmitting(true);
        setSuccess(false);
        try {
            const response = await axiosPrivate.patch('/user/auth', {
                password: values.password,
            })
            console.log(response)
            setSuccess(true);
            setOk(response.data.message);

        } catch (e) {
            setError(e.message);
            console.log(e)
        } finally {
            setSubmitting(false);

        }
    }

    return (
        <Formik
            initialValues={{
                password: '',
                matchPassword: ''
            }}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='pwdForm'>
                    {/*{JSON.stringify(props)}*/}
                    <Box>
                        <PasswordInput
                            label='Password'
                            name='password'
                            placeholder='password'
                            color={success ? 'success' : null}
                            focused={success}
                        />
                    </Box>
                    <Box>
                        <PasswordInput
                            label='Confirm password'
                            name='matchPassword'
                            placeholder='password'
                            color={success ? 'success' : null}
                            focused={success}
                        />
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default function PasswordDialog() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState()
    const handleClose = () => {
        setError('');
        setSuccess('');
        setOpen(false)
    };
    const iconSrc = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png"


    return (
        <div>
            <Button mt={2} variant='outlined' onClick={() => setOpen(true)}>
                <Grid container mt={0} gap={0.5} alignItems={'center'}>
                    <Grid item={'true'} lg={2}>
                        <img style={{width: 30}}
                             src={iconSrc}
                             alt="Locked with Key"/>
                    </Grid>
                    <Grid item={'true'} lg={2}>
                        Change Password
                    </Grid>
                </Grid>
            </Button>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setError('');
                    setSuccess('');
                }}

            >
                <DialogTitle id="change-pwd">
                    <Grid container mt={0} gap={0.5} alignItems={'center'}>
                        <Grid item={'true'} lg={2}>
                            <img style={{width: 30}}
                                 src={iconSrc}
                                 alt="Locked with Key"/>
                        </Grid>
                        <Grid item={'true'}>
                            Change Password
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider  />

                <DialogContent>
                    {success ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                        style={{width: '50%'}}
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands%20Light%20Skin%20Tone.png"
                        alt="Clapping Hands Light Skin Tone"/>
                        <p>{success}</p></div>) : null}
                    {error ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                        style={{width: '50%'} }
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/No%20Entry.png" alt="No Entry"/>
                        <p>Unexpected error</p></div>) : null}
                    <ChangePasswordForm setSuccess={setSuccess} setError={setError} setSubmitting={setSubmitting}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button form='pwdForm' type='submit'
                            disabled={submitting}
                    >
                        {submitting ? "Saving" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}