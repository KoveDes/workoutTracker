import React from "react";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import {formatSeconds} from "../../utils/formatters.js";

function ExerciseRow({row}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell><Typography variant='subtitle1' fontWeight='500' >{row.name}</Typography></TableCell>
                <TableCell align="right">{row.sets.length}</TableCell>
                <TableCell align="right">{formatSeconds(row.restTime)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sets
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Reps</TableCell>
                                        <TableCell>Load</TableCell>
                                        <TableCell align="right">RPE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.sets.map((set, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {set.reps}
                                            </TableCell>
                                            <TableCell>{set.load} kg</TableCell>
                                            <TableCell align="right">{set.rpe}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default ExerciseRow;