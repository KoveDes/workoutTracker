import React from 'react';
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";

function StretchExerciseDetails({exercise}) {
    return (
        <Grid container direction='column' >
            <Box
                component="img"
                alt={exercise.name}
                src={exercise.gifUrl}
                sx={{
                    maxWidth: '100%',
                    objectFit: 'contain',
                }}
            />
            <Typography variant='h6' sx={{color: 'royalblue'}}>Instructions:</Typography>
            {exercise?.instructions.map((line, index ) =>(
                <Typography key={index}>{index + 1}. {line}</Typography>
            ))}

        </Grid>
    );
}

export default StretchExerciseDetails;