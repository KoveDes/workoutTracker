import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import {Box, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import EntryItem from "./EntryItem.jsx";
import GoalFinished from "./GoalFinished.jsx";
import useFetch from "../hooks/useFetch.js";

function TableDialog({open, handleClose, label, apiPath, payloadParam, setChange, setRefresh}) {
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1);
    const [showGoal, setShowGoal] = useState(null);

    const {response} = useFetch(({
        method: 'get',
        path: `${apiPath}/5/${5 * page - 5}`,
        deps: [reload, page],
    }))
    const data = response?.data;
    const total = Math.ceil(response?.count / 5) || 1;


    return (
        <Dialog open={open} onClose={handleClose} maxWidth='true'>
            <DialogContent>
                <Grid container direction='column' alignItems='center'>
                    <TableContainer component={Box} sx={{
                        minWidth: '500px',

                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>{label}</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row) => (
                                    <EntryItem
                                        key={row._id}
                                        data={row}
                                        setChange={setChange}
                                        payloadParam={payloadParam}
                                        apiPath={payloadParam === 'weight' ? '/user' : apiPath}
                                        dataValue={row[payloadParam]}
                                        setReload={setReload}
                                        setRefresh={setRefresh}
                                        setShowGoal={setShowGoal}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        sx={{mt: '15px'}}
                        onChange={(e, value) => setPage(value)}
                        page={page}
                        count={total}
                    />
                    {showGoal && (
                        <GoalFinished
                            message={showGoal?.message}
                            goal={showGoal.goal}
                        />
                    )}
                </Grid>
            </DialogContent>

        </Dialog>
    );
}


export default TableDialog;