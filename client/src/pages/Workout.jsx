import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Alert, Box, Container, Grid, Snackbar, Tab, Tabs, TextField, Typography} from "@mui/material";
import ExerciseContainer from "../components/workout/ExerciseContainer.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import CustomDialog from "../components/CustomDialog.jsx";
import InvalidUseImg from '../assets/InvalidUse.png'
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import StyledButton from "../components/StyledButton.jsx";
import NoteImg from '../assets/Note.png'

function Workout({}) {
    const {state} = useLocation();
    const [workout, setWorkout] = useState({
        exercises: []
    });
    const[error, setError] = useState(false);
    const [currentSet, setCurrentSet] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [note, setNote] = useState('');
    const workoutNote = useDropdownMenu();
    const workoutRoutine = state?.workoutRoutine;
    const handleExerciseChange = (e, value) => {
        setCurrentExercise(value);
        setCurrentSet(0);
        setShowTimer(false);

    }
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    console.log(workout.exercises.length, workoutRoutine.exercises.length);


    const onSubmit = async () => {
        // setError(false);
        try {
                const response = await axiosPrivate.post('/workouts', {
                    name: workoutRoutine?.name,
                    icon: workoutRoutine?.icon,
                    note: note || null,
                    exercises: workout.exercises,
                    routineId: workoutRoutine._id,
                    planId: state.planId,
                });
            console.log(response);
            navigate('/workout/details', {state: {
                        goalMessage: response?.data?.goalMessage,
                        name: workoutRoutine.name,
                        icon: workoutRoutine?.icon,
                        note: note || null,
                        exercises: workout.exercises,
                        routineId: workoutRoutine._id,
                        planId: state.planId,
                        bodyParts: workoutRoutine.exercises.reduce((acc, ex) => {
                        return [...acc, ex.exercise.target]
                    }, []),} })
            }

         catch (e) {
            setError(true);
        }
    }

    if(workout.exercises.length ===  workoutRoutine.exercises.length) {
        onSubmit();
    }

    if(!workoutRoutine) {
        return (
            <Grid container direction='column' justifyContent='center' alignItems='center' gap={3}>
                <Box
                    component='img'
                    src={InvalidUseImg}
                    sx={{width: '200px', height: '200px'}}
                />
                <Typography variant='h4' fontWeight='bold' sx={{color: 'black'}}>Invalid use</Typography>
                <StyledButton
                    component={Link}
                    to='/workoutPlans'
                >
                    Choose Workout routine
                </StyledButton>
            </Grid>
        )
    }

    return (
        <Container maxWidth={'xl'}>
            <Grid container direction='column' gap={0}>
                <Grid container justifyContent='center'>
                    <Box
                        component='img'
                        width='50px'
                        src={workoutRoutine.icon}
                    />
                    <Typography variant='h3'>{workoutRoutine.name}</Typography>
                </Grid>
                <Grid container spacing={3} gap={0}>
                    <Grid item container direction='column' alignItems='center'
                          sm={3}
                          sx={{
                              p: '10px',
                              textAlign: 'center',
                          }}>
                        <Box
                            component='img'
                            onClick={workoutNote.handleOpen}
                            src={NoteImg}
                            sx={{
                                width: '60px',
                                mb: '20px',
                                cursor: 'pointer'
                            }}/>
                        <CustomDialog
                            label='Workout Notebook'
                            isForm={false}
                            width='md'
                            showButtons={false}
                            open={workoutNote.open}
                            handleClose={workoutNote.handleClose}
                        >
                            <TextField
                                placeholder="..."
                                fullWidth
                                label='Note'
                                variant='filled'
                                value={note}
                                minRows={4}
                                onChange={e => setNote(e.target.value)}
                                multiline
                            />
                        </CustomDialog>
                        <Typography variant='h4' >Exercises</Typography>
                        <Tabs
                            sx={{
                                cursor: 'default',
                            }}
                            orientation="vertical"
                            TabIndicatorProps={{
                                sx: {
                                    backgroundColor: '#3b3b3f',
                                    width: '100%',
                                    zIndex: -1,
                                    transition: 'all 0.3s',
                                    cursor: 'default',

                                }
                            }}
                            value={currentExercise}
                            // onChange={handleExerciseChange}
                        >
                            {workoutRoutine.exercises.map((exercise, index) => (
                                <Tab
                                    disableRipple
                                    disabled={!!workout.exercises.find(ex => ex.name === exercise.exercise.name)}
                                    sx={{
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        margin: '5px',
                                        '&.Mui-selected': {
                                            color: 'white',
                                            transition: 'all 0.3s'
                                        }
                                    }}
                                    label={`#${index + 1} ${exercise.exercise.name} `}
                                    key={exercise.exercise.name}
                                />
                            ))}

                        </Tabs>
                    </Grid>
                    <Grid item sm={9}>
                        <ExerciseContainer
                            setWorkout={setWorkout}
                            exercise={workoutRoutine.exercises[currentExercise]}
                            setCurrentExercise={setCurrentExercise}
                            setCurrentSet={setCurrentSet}
                            currentSet={currentSet}
                            showTimer={showTimer}
                            workout={workout}
                            handleSave={onSubmit}
                            setShowTimer={setShowTimer}
                            serverError={error}
                            isLastExercise={workoutRoutine.exercises.length === currentExercise + 1}
                        />
                        {/*{JSON.stringify(workout)}*/}
                        {error ? (
                            <Snackbar
                                open={!!error}
                                severity='true'
                                // autoHideDuration={4000}
                                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                            >
                                <Alert severity="error" sx={{width: '100%'}}>
                                    Server Error, try again after some time
                                </Alert>
                            </Snackbar>
                        ) : null}
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
}

export default Workout;