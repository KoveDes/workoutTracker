import React, {useState} from 'react';
import {Box, Divider, Unstable_Grid2 as Grid} from "@mui/material";
import Button from "@mui/material/Button";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import CustomInput, {CustomCheckbox} from "./CustomInputs.jsx";
import workoutPlanSchema from "../schemas/workoutPlanSchema.js";

export function RoutineForm({setError, setSubmitting, success, setSuccess, setChange, workoutPlan}) {
    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async (values, actions) => {
        setError('');
        setSuccess(false);
        setSubmitting(true);
        let message = '';
        try {
            if (workoutPlan?.name) {
                const response = await axiosPrivate.patch('/workoutPlan', {
                    name: values.name,
                    description: values.description,
                    main: values.main,
                    id: workoutPlan._id
                })
                message = 'Workout Plan updated';
            } else {
                const response = await axiosPrivate.post('/workoutPlan', {
                    name: values.name,
                    description: values.description,
                    main: values.main,
                })
                message = 'New workout Plan created!';
            }
            setSuccess(true);
            setChange(v => !v);
            setSuccess(message);

        } catch (e) {
            setError(e.message);
            console.log(e)
        } finally {
            setSubmitting(false);

        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                name: workoutPlan?.name || '',
                description: workoutPlan?.description || '',
                main: workoutPlan?.main || false,
            }}
            validationSchema={workoutPlanSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='planForm'>
                    {/*{JSON.stringify(props)}*/}
                    <Box>
                        <CustomInput
                            label='Name'
                            name='name'
                            placeholder='name'
                            color={success ? 'success' : null}
                            // focused={!!success}
                        />
                    </Box>
                    <Box>
                        <CustomInput
                            label='Description'
                            name='description'
                            placeholder='description...'
                            color={success ? 'success' : null}
                            // focused={!!success}
                        />
                    </Box>
                    <Box>
                        <CustomCheckbox
                            label='Main'
                            name='main'
                            color={success ? 'success' : null}
                            // focused={!!success}
                        />
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

function WorkoutPlanControls({setChange, workoutPlan}) {
    const {open, handleOpen, handleClose: x} = useDropdownMenu();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState()
    const handleClose = () => {
        setError('');
        setSuccess('');
        x();
    };
    const iconSrc = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png"


    return (

    <Box>
        {
            workoutPlan?.name ? (<p onClick={handleOpen}> Edit</p>) : (
        <Button onClick={handleOpen}
                variant='outlined'
                sx={{
                    border: 'none',
                    color: 'white',
                    backgroundColor: 'royalblue',
                    "&:hover" : {
                            backgroundColor: '#3b4973',
                        border: 'none',
                    }
                }}>{"Add new Routine"}</Button>
        )}
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="change-pwd">
                <Grid container mt={0} gap={0.5} alignItems={'center'}>
                    <Grid item={'true'}>
                        Workout Routine
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider/>

            <DialogContent>
                {success ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                    style={{width: '50%'}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands%20Light%20Skin%20Tone.png"
                    alt="Clapping Hands Light Skin Tone"/>
                    <p>{success}</p></div>) : null}
                {error ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                    style={{width: '50%'}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/No%20Entry.png"
                    alt="No Entry"/>
                    <p>Unexpected error</p></div>) : null}
                <RoutineForm workoutPlan={workoutPlan} setChange={setChange} success={success} setSuccess={setSuccess}
                             setError={setError} setSubmitting={setSubmitting}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button form='planForm' type='submit'
                        disabled={submitting}
                >
                    {submitting ? "Saving" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
)
    ;
}

export default WorkoutPlanControls;