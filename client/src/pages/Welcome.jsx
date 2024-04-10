import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import Robot from "../assets/Robot.png";
import {Link} from "react-router-dom";
import StyledButton from "../components/StyledButton.jsx";

function Welcome() {
    return (
        <Grid container direction='column' alignItems='center' sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            width: '100vw',
            height: '100vh',
            justifyContent: 'center'
        }}>

            <Box
                component='img'
                src={Robot}
            />
            <Typography variant='h2' fontWeight='bold' sx={{color: '#5200ff'}}>
                GymTrackr
            </Typography>
            <Typography variant='body1' fontWeight='bold' sx={{color: '#3b3b3f'}}>
                Your ultimate workout partner!
            </Typography>
            <Stack direction='row' gap={3} mt={'20px'}>
            <StyledButton
                component={Link}
                to='/login'
            >Sign in
            </StyledButton>
            <StyledButton
                component={Link}
                to='/register'
            >Sign up
            </StyledButton>
            </Stack>
            <Typography variant='p' sx={{color: 'red', textAlign: 'center'}} >This site is deployed on a free platform. Give it a little time until everything loads</Typography>

        </Grid>
    );
}

export default Welcome;