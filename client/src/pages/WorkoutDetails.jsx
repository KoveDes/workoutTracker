import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";
import WorkoutInfo from "../components/workout/WorkoutInfo.jsx";
import StretchingSuggestion from "../components/workout/StretchingSuggestion.jsx";
import InvalidUseImg from '../assets/InvalidUse.png'
import CongratsImg from '../assets/Party Popper.png';
import StyledButton from "../components/StyledButton.jsx";
import GoalFinished from "../components/GoalFinished.jsx";
import ShareDialog from "../components/share/ShareDialog.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";

function WorkoutDetails() {
    const {state: workout} = useLocation();
    const share = useDropdownMenu();
    if (!workout) {
        return (
            <Grid container direction='column' justifyContent='center' alignItems='center' gap={3} mt={'50px'}>
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
        <Grid container direction='column' alignItems='center' gap={0}>
            {workout?.goalMessage && (
                <GoalFinished
                    message={workout?.goalMessage?.message}
                    goal={workout?.goalMessage.goal}
                    isArray={Array.isArray(workout?.goalMessage.goal)}
                />
            )}
            <Box
                component='img'
                src={CongratsImg}
                sx={{
                    width: '100px',
                    height: '100px',
                    transform: 'rotateZ(315deg)',
                    mb: '30px'
                }}
            />
            <Typography variant='h3' sx={{color: 'royalblue'}}>Congratulations!</Typography>
            <Typography variant='h6' sx={{color: 'royalblue'}} mt='5px'>You finished
                <Box
                    component='img'
                    src={workout?.icon}
                    sx={{
                        height: '2rem',
                        mx: '4px'
                    }}
                />
                <Typography component='span' variant='h6' sx={{color: 'black'}}> {workout?.name} </Typography>
                workout </Typography>
            <WorkoutInfo workout={workout}/>
            <Grid container gap={3} justifyContent='center' sx={{my: '30px'}}>
                <StyledButton component={Link} to='/' >Go Home</StyledButton>
                <StyledButton onClick={share.handleOpen} sx={{backgroundColor: '#5200ff'}}>Share your workout!</StyledButton>
            </Grid>


            {share.open && (
                <ShareDialog
                    handleClose={share.handleClose}
                    open={share.open}
                    data={workout}
                />
            )}

            <Typography variant='h5'>
                After great workout it's great to do some stretching.
            </Typography>
            <Typography variant='body1'>
                Based on your exercises, here are some stretches that are great for the target muscles you worked on!
            </Typography>
            <StretchingSuggestion bodyParts={workout.bodyParts}/>
        </Grid>
    );
}

export default WorkoutDetails;