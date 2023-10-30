import React from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {FieldArray} from "formik";
import {FormikStep, FormikStepper, FormikStepWithValues} from "../pages/Register";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, Typography} from "@mui/material";
import CustomInput, {CustomCheckboxList, CustomSlider, CustomSwitch} from "../components/CustomInputs.jsx";
import routinePlanSchema from "../schemas/routinePlanSchema.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {formatSeconds} from "../utils/formatters";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const exercises = [
    {

        bodyPart: "lower legs",
        equipment: "body weight",
        gifUrl: "data\\images\\fOuATSOLSn01mL.gif",
        id: "1368",
        name: "ankle circles",
        target: "calves",
        secondaryMuscles: ["ankle stabilizers"],

    },
    {

        bodyPart: "back",
        equipment: "body weight",
        gifUrl: "data\\images\\UA8KVthSeQwBug.gif",
        id: "3293",
        name: "archer pull up",
        target: "lats",
        secondaryMuscles: ["biceps", "forearms"],


    },
    {
        bodyPart: "chest",
        equipment: "body weight",
        gifUrl: "data\\images\\TeG6xgglLFWqt9.gif",
        id: "3294",
        name: "archer push up",
        target: "pectorals",
        secondaryMuscles: ["triceps", "shoulders", "core"],

    }
];

const testExercises = [{
    exercise: {name: 'Pull up'},
    name: "Pull up",
    restTime: 70,
    sets: [{
        reps: 10,
        duration: 0,
        showDuration: false,
    },]

},
    {
        exercise: {name: 'Pull Down'},
        name: "Pull Down",
        restTime: 0,
        sets: [{
            reps: 20,
            duration: 20,
            showDuration: false,
        }]

    }
]

function WorkoutRoutineForm({setError, setSubmitting, success, setSuccess, setChange, routine}) {
    const axiosPrivate = useAxiosPrivate();
    // const handleSubmit = async (values, actions) => {
    //     setError('');
    //     setSuccess(false);
    //     setSubmitting(true);
    //     let message = '';
    //     try {
    //         if (workoutPlan?.name) {
    //             const response = await axiosPrivate.patch('/workoutPlan', {
    //                 name: values.name,
    //                 description: values.description,
    {/*                main: values.main,*/
    }
    {/*                id: workoutPlan._id*/
    }
    //             })
    //             message = 'Workout Plan updated';
    //         } else {
    //             const response = await axiosPrivate.post('/workoutPlan', {
    //                 name: values.name,
    //                 description: values.description,
    //                 main: values.main,
    //             })
    //             message = 'New workout Plan created!';
    //         }
    {/*        setSuccess(true);*/
    }
    {/*        setChange(v => !v);*/
    }
    //         setSuccess(message);
    //
    //     } catch (e) {
    //         setError(e.message);
    //         console.log(e)
    //     } finally {
    //         setSubmitting(false);
    //
    //     }
    // }
    const onSubmit = async (values) => alert(JSON.stringify(values))


    return (
        <FormikStepper
            exercises={true}
            onSubmit={onSubmit}
            submitText='Create'
            submittingText='Creating routine...'
            enableReinitialize={true}
            initialValues={{
                name: routine?.name || '',
                note: routine?.note || '',
                icon: routine?.icon || '',
                days: routine?.days || [],
                exercises: testExercises || [{
                    exercise: {},
                    restTime: 0,
                    sets: [{
                        reps: 0,
                        duration: 0,
                        showDuration: false,
                    }]
                }
                ],
            }}
            // validationSchema={routinePlanSchema}
        >
            <FormikStep
                label='General'
                validationSchema={routinePlanSchema}
            >
                <Box>
                    <CustomInput
                        label='Name'
                        name='name'
                        placeholder='name'
                        color={success ? 'success' : null}
                    />
                </Box>
                <Box>
                    <CustomInput
                        label='Description'
                        name='note'
                        multiline
                        placeholder='Description...'
                        color={success ? 'success' : null}
                    />
                </Box>
                <Box>
                    <CustomInput
                        label='Icon URL'
                        name='icon'
                        placeholder='https://....'
                        color={success ? 'success' : null}
                    />
                </Box>
                <Box>
                    <CustomCheckboxList
                        label='Days'
                        name='days'
                        itemArray={['Monday', 'Tuesday', 'Wednesday',
                            'Thursday', 'Friday', 'Saturday', 'Sunday']}


                    />
                </Box>
            </FormikStep>
            <FormikStep
                label='Exercises'
            >
                <Typography>E</Typography>
            </FormikStep>

            <FormikStepWithValues label='Details'>
                {({formValues}) => (
                    <FieldArray name={'exercises'}>
                        {({insert, remove, push}) => (
                            <Grid container direction='column' gap='30px' mt='30px'>
                                {formValues.exercises.length > 0 &&
                                    formValues.exercises.map((exercise, index) => (
                                        <Accordion key={index} sx={{
                                            // border: '2px dashed cornflowerblue',
                                            boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                                            border: '2px solid #45a0fd8c'
                                        }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                                <Grid container alignItems='center' gap='20px'>
                                                    <Box sx={{height: '60px', width: '60px',}}>
                                                        <Box component='img'
                                                             src={exercises.exercise?.gifUrl || 'Img'}
                                                             sx={{objectFit: 'cover', width: '100%'}}></Box>
                                                    </Box>
                                                    <Typography
                                                        fontWeight='500'>{exercise.exercise?.name}</Typography>

                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {/*<CustomInput*/}
                                                {/*    label='Rest time'*/}
                                                {/*    name={`exercises.${index}.restTime`}*/}
                                                {/*    type='number'*/}
                                                {/*    color={success ? 'success' : null}*/}
                                                {/*/>*/}
                                                <Box>
                                                    <CustomSlider
                                                        formater={formatSeconds}
                                                        displayLabel='off'
                                                        label='Rest time'
                                                        name={`exercises.${index}.restTime`}
                                                    />

                                                </Box>
                                                {/*<Typography variant='h5'>Sets</Typography>*/}
                                                {/*<Divider/>*/}
                                                <FieldArray name={`exercises.${index}.sets`}>
                                                    {({insert, remove, push}) => (
                                                        <Box mt={'15px'}>
                                                            <Button
                                                                variant='outlined'
                                                                sx={{width: '100%', mb: '15px'}}
                                                                onClick={() => push({reps: 0, duration: 0})}
                                                            >
                                                                Add Set
                                                            </Button>

                                                            <Grid container direction='column' gap={3}>
                                                                {formValues.exercises[index].sets?.length > 0 &&
                                                                    formValues.exercises[index].sets.map((set, setIndex) => (


                                                                        <Accordion
                                                                            key={setIndex}
                                                                            sx={{
                                                                                p: '0 20px',
                                                                                border: '2px dashed cornflowerblue',
                                                                                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",

                                                                            }}>
                                                                            <AccordionSummary sx={{
                                                                            }}
                                                                                expandIcon={<ExpandMoreIcon/>}>
                                                                                <Grid container alignItems='center' >
                                                                                   <IconButton
                                                                                        onClick={() => {
                                                                                            remove(setIndex)
                                                                                        }}
                                                                                    >
                                                                                        <DeleteForeverIcon sx={{
                                                                                            color: 'rgba(0, 0, 0, 0.87)',
                                                                                            p: '5px',
                                                                                            m: 0,
                                                                                            borderRadius: '50%'
                                                                                        }}/>
                                                                                    </IconButton>
                                                                                    <Typography variant='body1'
                                                                                                fontWeight='bold'
                                                                                                sx={{color: '#444'}}>Set {setIndex + 1}</Typography>

                                                                                </Grid>
                                                                            </AccordionSummary>
                                                                            <AccordionDetails>
                                                                                <Box>
                                                                                    <CustomSlider
                                                                                        formater={(v) => `${v} reps`}
                                                                                        label='Reps'
                                                                                        min={1}
                                                                                        max={50}
                                                                                        step={1}
                                                                                        displayLabel='off'
                                                                                        name={`exercises.${index}.sets.${setIndex}.reps`}
                                                                                    />
                                                                                </Box>
                                                                                {exercise.sets[setIndex]?.duration > 0 ? null : (
                                                                                <Box>
                                                                                    <CustomSwitch
                                                                                        label='Duration exercise'
                                                                                        name={`exercises.${index}.sets.${setIndex}.showDuration`}
                                                                                    />
                                                                                </Box>
                                                                                ) }
                                                                                {(exercise.sets[setIndex]?.duration > 0 || exercise.sets[setIndex]?.showDuration )  ? (
                                                                                <Box>
                                                                                    <CustomSlider
                                                                                        formater={formatSeconds}
                                                                                        displayLabel='off'
                                                                                        label='Duration'
                                                                                        name={`exercises.${index}.sets.${setIndex}.duration`}
                                                                                    />
                                                                                </Box>
                                                                                ) : null}

                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                    ))}

                                                            </Grid>
                                                        </Box>

                                                    )}
                                                </FieldArray>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                            </Grid>

                        )}

                    </FieldArray>
                )}
            </FormikStepWithValues>

        </FormikStepper>
    )

}

export default WorkoutRoutineForm;