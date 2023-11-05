import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Box, Container, Grid, Tab, Tabs, TextField, Typography} from "@mui/material";
import ExerciseContainer from "./ExerciseContainer.jsx";
import Button from "@mui/material/Button";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

function Workout({}) {
    const {state} = useLocation();
    const [workout, setWorkout] = useState({
        exercises: []
    });
    console.log(state)
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
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const onSubmit = async () => {
        setError(false);
        try {
                const response = await axiosPrivate.post('/workouts', {
                    name: workoutRoutine.name,
                    icon: workoutRoutine?.icon,
                    note: note || null,
                    exercises: workout.exercises,
                    routineId: workoutRoutine._id,
                    planId: state.planId,

                });
            navigate('details', {state: {
                        name: workoutRoutine.name,
                        icon: workoutRoutine?.icon,
                        note: note || null,
                        exercises: workout.exercises,
                        routineId: workoutRoutine._id,
                        planId: state.planId,
                        bodyParts: workoutRoutine.exercises.reduce((acc, ex) => {
                        return [...acc, ex.exercise.target]
                    }, []),

                    } })
            }

         catch (e) {
            setError(true);
        }
    }



    if(!workoutRoutine) {
        return (
            <Grid container direction='column' justifyContent='center' alignItems='center' gap={3}>
                <Box
                    component='img'
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Crossed-Out%20Eyes.png"
                    sx={{width: '200px', height: '200px'}}
                />
                <Typography variant='h4' fontWeight='bold' sx={{color: 'black'}}>Invalid use</Typography>
                <Button
                    variant='outlined'
                    sx={{color: 'royalblue', borderColor: 'royalblue'}}
                    component={Link}
                    to='/workoutPlans'
                >
                    Choose Workout routine
                </Button>
            </Grid>
        )
    }

    return (
        <Container maxWidth={'xl'}>
            <Grid container direction='column' gap={0}>
                {/*<div>{JSON.stringify(workoutRoutine)}</div>*/}
                <Grid container justifyContent='center'>
                    {JSON.stringify(error)}
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
                              // border: '3px dashed cornflowerblue'
                          }}>
                        <Box
                            component='img'
                            onClick={workoutNote.handleOpen}
                            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png'
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


                        <Typography variant='h4'>Exercises</Typography>
                        <Tabs
                            orientation="vertical"
                            // variant="scrollable
                            // "
                            TabIndicatorProps={{
                                sx: {
                                    backgroundColor: 'cornflowerblue',
                                    width: '100%',
                                    zIndex: -1,
                                    transition: 'all 0.3s'

                                }
                            }}
                            value={currentExercise}
                            onChange={handleExerciseChange}
                        >
                            {workoutRoutine.exercises.map((exercise, index) => (
                                <Tab
                                    disableRipple
                                    disabled={!!workout.exercises.find(ex => ex.name === exercise.exercise.name)}
                                    //if workout has exercise with this name, disable tab
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
                        {error &&<Typography variant='h5' fontWeight='bold' sx={{color: 'crimson'}}>Server error, try again after some time</Typography>}
                        {JSON.stringify(workout)};
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
}

export default Workout;