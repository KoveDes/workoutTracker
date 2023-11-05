import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import EntryItem from "./EntryItem.jsx";
import GoalFinished from "./GoalFinished.jsx";

function TableDialog({open, handleClose, label, apiPath, payloadParam, setChange, setRefresh}) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1);
    const [showGoal, setShowGoal] = useState(null);

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`${apiPath}/5/${5 * page - 5}?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data?.data);
                    setTotal(Math.ceil(response.data?.count / 7))
                }
            } catch (e) {
                console.log(e);
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [reload, page]);


    return (
        <Dialog open={open} onClose={handleClose} maxWidth='true'>
            {/*<DialogTitle textAlign='center'>{label}</DialogTitle>*/}
            <DialogContent>
                <Grid container direction='column' alignItems='center' >
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
                            {data.map((row) => (
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
                    sx={{backgroundColor: 'white'}}
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