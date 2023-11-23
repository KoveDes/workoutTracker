import React from 'react';
import {Box, Chip, Grid, Typography} from "@mui/material";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import ExerciseVideos from "./ExerciseVideos.jsx";
import StyledButton from "../StyledButton.jsx";

function ExerciseInfo({exercise}) {
    const howTo = useDropdownMenu();
    return (
        <Grid container alignItems='center' direction='column' gap={1}>
            <Box
                component='img'
                src={exercise?.gifUrl}
            />
            <Typography fontWeight='500'></Typography>
            <Grid container justifyContent='center' gap={1}>
                <Chip label={exercise?.target} sx={{backgroundColor: 'gold'}}/>
                {exercise?.secondaryMuscles?.map(muscle => (<Chip key={muscle} label={muscle}/>))}
            </Grid>
            <StyledButton
                variant='outlined'
                onClick={howTo.handleOpen}>
                How to execute
            </StyledButton>
            <CustomDialog
                width={'lg'}
                label={`${exercise?.name}`}
                isForm={false}
                showButtons={false}
                open={howTo.open}
                handleClose={howTo.handleClose}>
                <ExerciseVideos name={exercise?.name} target={exercise?.target}/>

            </CustomDialog>
        </Grid>
    );
}

export default ExerciseInfo;