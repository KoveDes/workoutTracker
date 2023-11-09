import React, {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {FieldArray} from "formik";
import {Alert, Box, Grid, Snackbar} from "@mui/material";
import routinePlanSchema from "../../schemas/routinePlanSchema.js";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import useAuth from "../../hooks/useAuth.js";
import DroppableBox from "../../components/dnd/DroppableBox.jsx";
import ExercisesList from "../../components/exercises/ExercisesList.jsx";
import {FiltersProvider} from "../../context/filtersProvider.jsx";
import {DndContext} from "@dnd-kit/core";
import DetailsForm from "./detailsForm.jsx";
import ExerciseDetails from "./exerciseDetails.jsx";
import ExercisesFilters from "../../components/exercises/ExercisesFilters.jsx";
import CustomDialog from "../../components/CustomDialog.jsx";
import Button from "@mui/material/Button";
import exercisesSchema from "../../schemas/exercisesSchema.js";
import exercisesDetailsSchema from "../../schemas/exercisesDetailsSchema.js";
import FormikStepper from "../../components/forms/FormikStepper.jsx";
import FormikStep from "../../components/forms/FormikStep.jsx";
import FormikStepWithValues from "../../components/forms/FormikStepWithValues.jsx";

const defaultIconImg = 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Fleur-de-lis.png'
const dayNameToIndex = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
};

function WorkoutRoutineForm({setError,planId, setIsSubmitting, success, setSuccess, setChange, routine}) {
    const axiosPrivate = useAxiosPrivate();
    const onSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        const changedDays = values.days ? values.days.map(day => {
            return dayNameToIndex[day];
        }) : null
        try {
            if (routine?.name) {
                await axiosPrivate.patch('/workoutPlan/routine', {
                    name: values.name,
                    note: values.note,
                    icon: values.icon,
                    days: values.days.length > 0 ? changedDays : null,
                    exercises: values.exercises,
                    performed: 0,
                    id: planId,
                    routineId: routine._id,
                })
                message = 'Workout Plan updated';
            } else {
                await axiosPrivate.post('/workoutPlan/routine', {
                    name: values.name,
                    note: values.note,
                    icon: values.icon || defaultIconImg,
                    days: values.days.length > 0 ? changedDays : null,
                    exercises: values.exercises,
                    performed: 0,
                    id: planId
                })
                message = 'New workout Plan created!';
            }
            setSuccess(true);
            setChange(v => !v);
            setSuccess(message);

        } catch (e) {
            setError(e.response.data.message);
        } finally {
            setIsSubmitting(false);

        }
    }
    const [selected, setSelected] = useState([]);
    const [message, setMessage] = useState('');
    const filters = useDropdownMenu();

    function handleDragEvent(event, push) {
        const droppedData = event.active.data.current;
        const collided = event.over.id === 'selectedExercises';
        if (selected.find(ex => ex.name === droppedData.name)) return setMessage('You have selected this exercise already')
        if (selected.length >= 12) return setMessage('Max 12 exercises can be selected')
        if (event.over && !selected.find(ex => ex.name === droppedData.name) && collided) {
            setSelected(v => [...v, event.active.data.current]);
            const {instructions, ...changedExercise} = event.active.data.current;
            push({
                exercise: changedExercise,
                restTime: 0,
                sets: [{
                    reps: 0,
                    duration: 0,
                    showDuration: false,
                }]
            })

        }
    }

    const formattedDays = routine?.days && routine?.days.map(day => {
        return ['Sunday', "Monday",'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday'][day];
    })

    return (
        <>
            {message ? (<Snackbar
                    open={!!message}
                    severity='true'
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setMessage('')}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
            ) : null}
            {/*{JSON.stringify(routine, null, 2)}*/}
            <FormikStepper
                exercises={true}
                onSubmit={onSubmit}
                submitText={routine?.name ?  'Edit': 'Create'}
                submittingText={routine?.name ? 'Editing routine...' : 'Creating routine...'}
                enableReinitialize={true}
                initialValues={{
                    name: routine?.name || '',
                    note: routine?.note || '',
                    icon: routine?.icon || '',
                    days: routine?.days ? formattedDays : [],
                    exercises: routine?.exercises || [],

                }}
            >
                <FormikStep
                    label='General'
                    validationSchema={routinePlanSchema}
                >
                    <Box sx={{maxWidth: '500px'}}>
                        <DetailsForm success={success}/>
                    </Box>
                </FormikStep>
                <FormikStepWithValues
                    validationSchema={exercisesSchema}
                    label='Exercises'
                >
                    {({formValues}) => (
                        <FieldArray name={'exercises'}>
                            {(helpers) => (
                                <DndContext onDragEnd={(e) => {
                                    handleDragEvent(e, helpers.push)

                                }}>
                                    <FiltersProvider>

                                        <Grid container spacing={6} wrap='nowrap'>
                                            <Grid item xs={8}>
                                                <Box
                                                    sx={{
                                                        minHeight: '500px',
                                                    }}
                                                >

                                                    <ExercisesList/>

                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} sx={{minWidth: '400px'}}>
                                                <DroppableBox selected={formValues.exercises} setSelected={setSelected}
                                                              formik={helpers}/>
                                                <Button onClick={filters.handleOpen}>Filters</Button>
                                                <CustomDialog
                                                    width='sm'
                                                    open={filters.open}
                                                    handleClose={filters.handleClose}
                                                    label={''}
                                                    formId='workoutRoutineForm'
                                                    showButtons={false}
                                                >
                                                    <ExercisesFilters/>

                                                </CustomDialog>

                                            </Grid>
                                        </Grid>
                                    </FiltersProvider>

                                </DndContext>
                            )}

                        </FieldArray>
                    )}

                </FormikStepWithValues>

                <FormikStepWithValues label='Details' validationSchema={exercisesDetailsSchema}>
                    {({formValues}) => (
                        <Grid container justifyContent='center'>
                            <Box sx={{width: '700px'}}>
                                <ExerciseDetails formValues={formValues}/>
                            </Box>
                        </Grid>
                    )}
                </FormikStepWithValues>

            </FormikStepper>
        </>

    )

}

export default WorkoutRoutineForm;