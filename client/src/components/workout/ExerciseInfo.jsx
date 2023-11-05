import React from 'react';
import {Box, Chip, Grid, Typography} from "@mui/material";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import Button from "@mui/material/Button";
import ExerciseVideos from "./ExerciseVideos.jsx";

function ExerciseInfo({exercise}) {
    const howTo = useDropdownMenu();
    return (
        <Grid container alignItems='center' direction='column' gap={1}
              sx={{
                  // backgroundColor: 'coral'
              }}>
            {/*<Typography*/}
            {/*    variant='h5'*/}
            {/*    textAlign='center'*/}
            {/*>{exercise.name}*/}
            {/*</Typography>*/}
            <Box
                component='img'
                src={exercise.gifUrl}
            />
            <Typography fontWeight='500'></Typography>
            <Grid container justifyContent='center' gap={1}>
                <Chip label={exercise.target} sx={{backgroundColor: 'gold'}}/>
                {exercise.secondaryMuscles.map(muscle => (<Chip key={muscle} label={muscle}/>))}
            </Grid>
            <Button
                variant='outlined'
                onClick={howTo.handleOpen}>
                How to execute
            </Button>
            <CustomDialog
                width={'lg'}
                label={`${exercise.name}`}
                isForm={false}
                showButtons={false}
                open={howTo.open}
                handleClose={howTo.handleClose}>
                <ExerciseVideos name={exercise.name} target={exercise.target}/>

            </CustomDialog>
        </Grid>
    );
}

export default ExerciseInfo;