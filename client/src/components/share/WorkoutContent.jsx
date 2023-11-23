import React from 'react';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

function WorkoutContent({data: workout}) {
    return (
        <Grid container justifyContent='center'  >
            {workout.exercises.map((row, index) => (
            <Grid
                key={index}
                item
                sm={6}
                md={2}
                container
                direction='column'
                alignItems='center'
                sx={{
                    margin: 1,
                    backgroundColor: 'lavender',
                    p: 1,
                    borderRadius: '20px',
                    position: 'relative',
                }}
            >
                <Typography
                    ariant="subtitle1"
                    textAlign='center'
                    fontWeight='bold'

                >#{index + 1} </Typography>
                <Typography variant="subtitle1" textAlign='center' fontWeight='bold'>
                    {row.name}
                </Typography>
                <Table size="small" sx={{maxWidth: '150px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reps</TableCell>
                            <TableCell>Load</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.sets.map((set, index) => (
                            <TableRow key={index} sx={{'td, th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {set.reps}
                                </TableCell>
                                <TableCell>{set.load} kg</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            ))}
        </Grid>
    );
}

export default WorkoutContent;