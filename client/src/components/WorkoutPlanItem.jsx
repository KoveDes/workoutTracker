import React from 'react';
import {WorkoutRoutineCard} from "./WorkoutRoutineCard";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add.js";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import WorkoutPlanSettingsPopover from "./WorkoutPlanSettingsPopover.jsx";

function WorkoutPlanItem({workoutPlan, style,setChange}) {
    const workoutRoutines = [
        {name: 'Push', note: 'elo', performed: 120},
        {name: 'Push', note: 'elo', performed: 120},
        {name: 'Push', note: 'elo', performed: 120},
        {name: 'Push', note: 'elo', performed: 120},

    ];
    const dropdownMenu = useDropdownMenu();
    return (
        <Box style={style}
             component="main"
             sx={{
                 flexGrow: 1,
                 py: 3,
                 // px: 0,
                 // border: '3px solid grey'
             }}
        >
            <Container maxWidth="xl">
                <Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        mb={4}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                {workoutPlan?.name }
                            </Typography>
                            <Typography variant="h6">
                                {workoutPlan?.description || ""}
                            </Typography>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >

                                <Button
                                    startIcon={(
                                        <AddIcon/>
                                    )}
                                    sx={{
                                        padding: '8px 20px',
                                        color: 'white',
                                        backgroundColor: 'rgb(99, 102, 241)',
                                        textTransform: 'none',
                                        borderRadius: '50px',
                                        '&:hover': {
                                            backgroundColor: 'rgb(67, 56, 202)'
                                        }
                                    }}
                                >
                                    Add Routine
                                </Button>
                            </Stack>
                        </Stack>
                        <div
                            onClick={dropdownMenu.handleOpen}
                            ref={dropdownMenu.anchorRef}
                            style={{
                                // backgroundColor: 'red',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                            }}
                        >
                            <img
                                style={{width: '100%', height: '100%'}}
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png"
                                alt="Gear"/>
                        </div>
                        <WorkoutPlanSettingsPopover
                            plan={workoutPlan}
                            setChange={setChange}
                            id={workoutPlan._id}
                            anchorEl={dropdownMenu.anchorRef.current}
                            open={dropdownMenu.open}
                            onClose={dropdownMenu.handleClose}
                        />
                    </Stack>
                    <Grid
                        container
                        justifyContent='center'
                        spacing={3}
                    >
                        {workoutRoutines.length ? workoutRoutines.map((workoutRoutine, index) => (
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                                key={workoutRoutine._id ? workoutRoutine._id : index}
                                item
                            >
                                <WorkoutRoutineCard workoutRoutine={workoutRoutine}/>
                            </Grid>
                        )) : (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Typography textAlign='center'>No Workout Routines</Typography>
                                {/*<AddWorkoutRoutine/>*/}
                            </Grid>
                        )}
                    </Grid>
                    {/*<Box*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'center'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*</Box>*/}
                </Stack>
            </Container>
        </Box>
    );
}

export default WorkoutPlanItem;