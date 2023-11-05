import React, {useCallback, useEffect, useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import ExerciseInfo from "./ExerciseInfo.jsx";
import {FieldArray, Form, Formik} from "formik";
import Button from "@mui/material/Button";
import Set from "./Set.jsx";
import Timer from "./Timer.jsx";
import workoutSetSchema from "../../schemas/workoutSetSchema.js";

function ExerciseContainer({
                               exercise,
                               serverError,
                               handleSave,
                               setWorkout,
                               isLastExercise,
                               setCurrentExercise,
                               currentSet,
                               setCurrentSet,
                               setShowTimer,
                               showTimer
                           }) {
    const exerciseDetails = exercise.exercise;
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [invokeSave, setInvokeSave] = useState(false)
    const handleSubmit = async (values, helpers) => {
        if (!serverError) {
            setWorkout(workout => ({
                ...workout,
                exercises: [
                    ...workout?.exercises,
                    values,
                ]
            }));
            setCurrentSet(0);
        }
        helpers.setErrors({});
        setShowTimer(false);
        if (!isLastExercise) {
            setCurrentExercise(v => v + 1);
        } else {
                setInvokeSave(v => !v);
        }
    }
    useEffect(() => {
        if (isLastExercise) {
            handleSave();
        }

    }, [invokeSave])
    const changeShowTimer = useCallback(() => setShowTimer(false), [])
    const changeCurrentSet = useCallback(() => setCurrentSet(v => v + 1), [])

    useEffect(() => {
        // Update form values when exercise.sets prop changes
        setFormValues({
            name: exerciseDetails.name,
            restTime: exercise.restTime,
            sets: exercise.sets.map(set => {
                const tpr = {
                    load: 0,
                    rpe: 0,
                    reps: set?.reps || 0,
                    finished: false,
                }
                if (set.showDuration) {
                    return {...tpr, duration: 0}
                }
                return tpr;
            }),
        });
    }, [exercise]);
    const handleNextSet = (finished) => {
        if (!finished) {
            setShowTimer(true);
        } else {
            if(!(exercise.sets.length -1 === currentSet && !isLastExercise)) {
                setCurrentSet(v => v + 1);
            }
        }
    }

    const validateNextStep = async (values, props, errors) => {
        const res = await props.validateForm({sets: [values.sets[currentSet]]});
        props.setErrors({});
        if (res?.sets) {
            setError(true);

        } else {
            setError(false);
        }
        console.log({setValidation: res, errors});
        return !res?.sets;
    }

    return (
        <Grid container alignItems='center' direction='row-reverse'>

            <Grid item sm={6}>
                <ExerciseInfo exercise={exerciseDetails}/>
            </Grid>
            <Grid item sm={6}>
                <Box>
                    {formValues ? (
                        <Formik
                            onSubmit={handleSubmit}
                            validationSchema={workoutSetSchema}
                            enableReinitialize={true}
                            initialValues={formValues}
                            validateOnChange={false}
                            validateOnBlur={false}

                        >
                            {({values, setFieldValue, errors, ...props}) => (<>
                                    <Form>
                                        {/*{JSON.stringify(props.validateOnChange)}*/}
                                        {/*{JSON.stringify(values)}*/}
                                        {/*{JSON.stringify(errors)}*/}
                                        {showTimer ? (<Box>
                                            <Timer
                                                restTime={exercise.restTime}
                                                currentSet={currentSet}
                                                setCurrentSet={changeCurrentSet}
                                                setShowTimer={changeShowTimer}/>
                                        </Box>) : (
                                            <FieldArray name={'sets'}>
                                                {(props) => (
                                                    <Box>
                                                        {values.sets.length > 0 ? values.sets.map((set, index) => (
                                                            <Box key={index}>
                                                                {currentSet === index ? (
                                                                    <Set
                                                                        previousValues={index > 0 ? values.sets[index - 1] : null}
                                                                        setsCount={values.sets.length}
                                                                        id={set._id}
                                                                        reps={set.reps}
                                                                        index={index}
                                                                    />
                                                                ) : null}
                                                            </Box>
                                                        )) : null}

                                                    </Box>

                                                )}
                                            </FieldArray>
                                        )}
                                    </Form>
                                    {!showTimer && (
                                        <Box>
                                            {error ? (
                                                    <Typography sx={{color: 'red'}} mt='15px'>
                                                        Set correct values to continue
                                                    </Typography>)
                                                : null}

                                            <Box>
                                                {currentSet > 0 &&
                                                    <Button onClick={() => {
                                                        setCurrentSet(v => v - 1)
                                                        setError(false)
                                                    }}>
                                                        Previous set
                                                    </Button>}
                                                {currentSet + 1 < exercise.sets.length ?
                                                    (<Button
                                                        onClick={async () => {
                                                            const validated = await validateNextStep(values, props, errors);
                                                            if (validated) {
                                                                handleNextSet(values.sets[currentSet].finished,);
                                                                setFieldValue(`sets.${currentSet}.finished`, true);
                                                                if (currentSet !== exercise.sets.length - 1 && !values.sets[currentSet].finished) //if current set != ostatni
                                                                    setFieldValue(`sets.${currentSet + 1}.load`, values.sets[currentSet].load);
                                                            }
                                                        }}>
                                                        Next Set
                                                    </Button>)
                                                    : <Button onClick={async () => {
                                                        const validated = await validateNextStep(values, props);
                                                        if (validated) {
                                                            await props.submitForm();
                                                            values.sets[currentSet].finished = true;

                                                        }

                                                    }}>
                                                        {!isLastExercise ? 'Next Exercise' : 'Finish workout'}
                                                    </Button>}
                                            </Box>

                                        </Box>
                                    )}
                                </>
                            )}

                        </Formik>
                    ) : null}
                </Box>

            </Grid>
        </Grid>
    );
}

export default ExerciseContainer;

