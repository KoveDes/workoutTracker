import React, {useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import {Form, Formik} from "formik";
import measurementGoalSchema from "../schemas/measurementGoalSchema.js";
import {Box, Divider, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomRadioList} from "../components/CustomInputs.jsx";
import countGoalSchema from "../schemas/countGoalSchema.js";

function CountGoalForm({setError, setIsSubmitting, setChange, setSuccess, data}) {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    console.log()
    const handleSubmit = async (values, actions) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        console.log('elo')
        let message = '';
        try {
            if (data) {
                const response = await axiosPrivate.patch('/goal', {
                    endValue: values.endValue,
                    id: data._id,
                })
                message = 'Goal updated';
            } else {
                const response = await axiosPrivate.post('/goal', {
                    category: 'workoutCount',
                    endValue: values.endValue,
                    currentValue: 0,

                })
                message = 'New goal created!';
            }
            setChange(v => !v);
            setSuccess(message);

        } catch (e) {
            setError(e?.response?.data?.message || e.message);
            console.log(e)
        } finally {
            setIsSubmitting(false);

        }
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                endValue: data?.endValue || 1,
            }}
            validationSchema={countGoalSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='countGoalForm'
                      style={{
                          maxWidth: 'inherit',
                      }}
                >

                    <Grid container spacing={0} direction='column'>
                        <Grid container justifyContent={'center'}>
                            <Box sx={{width: '35%'}}>
                                <CustomInput
                                    name='endValue'
                                    type='number'
                                    label='Workouts'
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CountGoalForm;