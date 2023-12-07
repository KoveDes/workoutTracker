import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import {Form, Formik} from "formik";
import {Box, Divider, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomRadioList} from "../components/CustomInputs.jsx";
import loadGoalSchema from "../schemas/loadGoalSchema.js";
import useFetch from "../hooks/useFetch.js";

function LoadGoalForm({setError, setIsSubmitting, success, setSuccess, data, setChange}) {
    const axiosPrivate = useAxiosPrivate();
    const {response} = useFetch(({
        method: 'get',
        path: 'workoutPlan/all',
        deps: [],
    }))
    const userExercises = response?.length > 0 && response?.reduce((accumulator, workoutPlan) =>
            [...accumulator, ...workoutPlan.workoutRoutine.reduce((acc, routine) => (
                [...acc, ...routine.exercises.map(e => e?.exercise?.name)]
            ), [])]
        , []);

    const {response: exercisesRecords} = useFetch(({
        method: 'get',
        path: 'stats/records',
        deps: [],
    }))

    const findValue = (name) => exercisesRecords?.find(record => record.name.toLowerCase() === name.toLowerCase())?.maxLoad


    const handleSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        try {
            if (data) {
                if(findValue(values.exercise) >= values.endValue) {
                    throw new Error('Value must be greater then current record')
                }
                await axiosPrivate.patch('/goal', {
                    endValue: values.endValue,
                    id: data._id,
                })
                message = 'Goal updated';
            } else {

                // if load is below record load throw error
                if(findValue(values.exercise) >= values.endValue) {
                    throw new Error('Value must be greater then current record')
                }
                await axiosPrivate.post('/goal', {
                    category: 'load',
                    exercise: values.exercise,
                    currentValue: findValue(values.exercise),
                    endValue: values.endValue,

                })
                message = 'New goal created!';
            }
            setChange(v => !v);
            setSuccess(message);

        } catch (e) {
            setError(e?.response?.data?.message || e.message);
        } finally {
            setIsSubmitting(false);

        }
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                exercise: data?.exercise || '',
                endValue: data?.endValue || 0,
            }}
            validationSchema={loadGoalSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='loadGoalForm'
                      style={{
                          maxWidth: 'inherit',
                          marginTop: '20px'
                      }}
                >
                    {response?.length === 0 ? (
                        <Box>
                            Create workout routine in order to add this goal!
                        </Box>
                    ) : (<>
                    <Grid mb='30px'>
                        <CustomRadioList
                            label='Exercises from workout plans'
                            name='exercise'
                            color={success ? 'success' : null}
                            itemArray={userExercises || []}
                        />
                    </Grid>
                    <Divider/>
                    </>)}
                    <Grid container spacing={0} direction='column'>
                        <Typography variant='h5' textAlign='center' m='15px'>{props.values.exercise}</Typography>
                        <Grid container alignItems='center' direction='column'>
                            <Typography>Current Value</Typography>
                            <Typography>{findValue(props.values.exercise)} kg</Typography>
                            <br/>
                            <Box sx={{width: '35%'}}>
                                <CustomInput
                                    name='endValue'
                                    type='number'
                                    adornment='kg'
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default LoadGoalForm;