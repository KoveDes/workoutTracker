import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import RoutineTable from "./RoutineTable.jsx";

function RoutineContent({data}) {
    return (
        <>
            <Grid container gap={1} alignItems='center'>
                <Box
                    component='img'
                    src={data?.icon}
                    sx={{width: '30px', height: '30px'}}
                />
                <Typography variant='h4' textAlign='left' fontWeight='bold'>{data?.name}</Typography>

            </Grid>
            <RoutineTable exercises={data.exercises}/>
        </>
    );
}

export default RoutineContent;