import React from 'react';
import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import ExerciseRow from "./ExerciseRow.jsx";

function WorkoutInfo({workout}) {
    return (
        <Grid>
            <Box sx={{
                // boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}>
                <TableContainer sx={{
                    boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                    borderRadius: '15px',
                    mt: '20px',
                }}>
                    <Table>
                        <TableHead sx={{backgroundColor: 'royalblue'}}>
                            <TableRow>
                                <TableCell/>
                                <TableCell><Typography fontWeight='bold'
                                                       sx={{color: 'white'}}>Exercise</Typography></TableCell>
                                <TableCell align="right"><Typography fontWeight='bold'
                                                                     sx={{color: 'white'}}>Sets</Typography></TableCell>
                                <TableCell align="right"><Typography fontWeight='600' sx={{color: 'white'}}>Rest
                                    time</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workout.exercises.map(row => (
                                <ExerciseRow key={row.name} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{position: 'relative'}}>
                        <Typography
                            variant='subtitle2'
                            fontWeight='bold'
                            sx={{position: 'absolute', color: 'royalblue', p:'5px'}}
                        >Note</Typography>

                        <TextField
                            fullWidth
                            variant='filled'
                            value={workout?.note}
                            minRows={4}
                            disabled
                            multiline
                        />
                    </Box>
                </TableContainer>
            </Box>

        </Grid>
    );
}


export default WorkoutInfo;