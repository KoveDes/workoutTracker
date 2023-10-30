import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import {Form, Formik} from "formik";
import {Box, Divider, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomRadioList} from "../components/CustomInputs.jsx";
import loadGoalSchema from "../schemas/loadGoalSchema.js";

function LoadGoalForm({setError, setIsSubmitting, success, setSuccess, data, setChange}) {
    const [userExercises, setUserExercises] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();


    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/workoutPlan/all?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    const data = response.data
                    const workoutRoutines = data.reduce((accumulator, workoutPlan) =>
                            [...accumulator, ...workoutPlan.workoutRoutine.reduce((acc, routine) => (
                                [...acc, ...routine.exercises.map(e => e.name)]
                            ), [])]
                        , []);
                    setUserExercises(workoutRoutines);
                }
            } catch (e) {
                console.log(e);
                setUserExercises([]);
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [])


    const handleSubmit = async (values, actions) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        try {
            if (data) {
                const response = await axiosPrivate.patch('/goal', {
                    endValue: values.endValue,
                    id: data._id,
                })
                message = 'Goal updated';
            } else {
                // const {data} = await axiosPrivate.get(`body/${values.bodyParameter}?user=${auth.user}`)
                // const currentSize = data[0]?.size || 0;
                // console.log(currentSize)
                // if(values.endValue === currentSize) {
                //     throw Error('You cant set your current size');
                // }
                const response = await axiosPrivate.post('/goal', {
                    category: 'load',
                    exercise: values.exercise,
                    currentValue: 0,
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
                    {data ? null : (<>
                    <Grid mb='30px'>
                        <CustomRadioList
                            label='Exercises from workout plans'
                            name='exercise'
                            color={success ? 'success' : null}
                            itemArray={userExercises}
                        />
                    </Grid>
                    <Divider/>
                    </>)}
                    <Grid container spacing={0} direction='column'>
                        <Typography variant='h5' textAlign='center' m='15px'>{props.values.exercise}</Typography>
                        <Grid container justifyContent={'space-between'}>
                        </Grid>
                        <Grid container justifyContent={'center'}>
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