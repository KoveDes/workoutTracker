import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {formatTime} from "../../utils/formatters";

function RoutineTable({exercises}) {
    const showReps = arr => arr.reduce((acc, ex) => [...acc, ex.reps] , []).join(" | ");
    return (
        <TableContainer >
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="right">Sets</TableCell>
                        <TableCell align="right">Reps</TableCell>
                        <TableCell align="right">Rest</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {exercises.map((exercise) => (
                        <TableRow
                            key={exercise.exercise.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {exercise.exercise.name}
                            </TableCell>
                            <TableCell align="right">{exercise.sets.length}</TableCell>
                            <TableCell align="right">{showReps(exercise.sets)}</TableCell>
                            <TableCell align="right">{formatTime(exercise.restTime)} m</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RoutineTable;