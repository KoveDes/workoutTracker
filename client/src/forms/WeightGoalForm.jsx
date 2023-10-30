import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import customExerciseSchema from "../schemas/customExerciseSchema.js";
import {Box, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomCheckboxList, CustomRadioList} from "../components/CustomInputs.jsx";
import {EQUIPMENT_OPTIONS, TARGET_MUSCLES} from "../components/exercises/ExercisesFilters.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import weightGoalSchema from "../schemas/weightGoalSchema.js";

function WeightGoalForm({setError, setIsSubmitting, setChange, setSuccess,data}) {
    const[currentWeight, setCurrentWeight] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/user/weight`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setCurrentWeight(response.data.weight);
                }
            } catch (e) {
                console.log(e);
                setCurrentWeight(0);
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
                if(values.endValue === currentWeight) {
                    throw Error('You cant set your current weight');
                }
                const response = await axiosPrivate.post('/goal', {
                    category: values.endValue > currentWeight ? 'weightUp' : 'weightDown',
                    currentValue: Number(currentWeight),
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
                endValue: data?.endValue || currentWeight,
            }}
            validationSchema={weightGoalSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='weightGoalForm'
                      style={{
                          maxWidth: 'inherit',
                          marginTop: '20px'
                      }}
                >
                    <Grid container spacing={2} direction='column'>
                        <Grid container justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='p'>Current weight</Typography>
                                <Typography variant='h6'>{currentWeight} kg</Typography>

                            </Box>
                            <Box>
                                <Typography variant='p'>{currentWeight === props.values.endValue ?
                                    'Lose / Put on' :currentWeight > props.values.endValue ? "Lose" : "Put on"  }</Typography>
                                <Typography variant='h6' textAlign='right'>
                                    {Math.abs(currentWeight - props.values.endValue)}
                                    kg</Typography>

                            </Box>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Box sx={{width:'25%'}}>
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

export default WeightGoalForm;