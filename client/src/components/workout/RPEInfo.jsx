import React from 'react';
import {Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

function RpeInfo(props) {
    return (
        <Grid container direction='column' alignItems='center'>
            <Box>
                <Typography >
                    The RPE stands for rate of perceived exertion.
                    It helps you to decide how much weight you should be lifting by measuring how hard you worked.
                </Typography>
                {/*<Typography variant='body2' fontWeight='bold' mt='15px'>Suggestions: </Typography>*/}
                {/*<Typography variant='body2'> 1. As a beginner aim for 7-8 points</Typography>*/}
                {/*<Typography variant='body2'> 2. Normally try to reach for 8-9 points</Typography>*/}

                <Box>
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Points</TableCell>
                                    <TableCell align='right'>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell>10</TableCell>
                                    <TableCell align='right'>Went to failure</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>9</TableCell>
                                    <TableCell align='right'>Could do 1 more rep</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>7-8</TableCell>
                                    <TableCell align='right'>Could do 2 or 3 more reps</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4-6</TableCell>
                                    <TableCell align='right'>Could do 2 or 3 more reps</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2-3</TableCell>
                                    <TableCell align='right'>Could do 4 or more reps</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell align='right'>Felt like a warm up</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>


            </Box>

        </Grid>
    )
        ;
}

export default RpeInfo;