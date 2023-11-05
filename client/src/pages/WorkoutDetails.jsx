import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import WorkoutInfo from "../components/workout/WorkoutInfo.jsx";
import StretchingSuggestion from "../components/StretchingSuggestion.jsx";


function WorkoutDetails(props) {
    const {state: workout} = useLocation();

    if (!workout) {
        return (
            <Grid container direction='column' justifyContent='center' alignItems='center' gap={3} mt={'50px'}>
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
        <Grid container direction='column' alignItems='center' gap={0}>
            {/*{JSON.stringify(workout)}*/}

            <Box
                component='img'
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
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
            <Button component={Link} to='/' variant='outlined' sx={{my: '30px'}}>Go Home</Button>

            <Typography variant='h5'>
                After great workout it's great to do some stretching.
            </Typography>
            <Typography variant='hbody1'>
                Based on your exercises, here are some stretches that are great for the target muscles you worked on!
            </Typography>
            <StretchingSuggestion bodyParts={workout.bodyParts}/>
        </Grid>
    );
}

export default WorkoutDetails;