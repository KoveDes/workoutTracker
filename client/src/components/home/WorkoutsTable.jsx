import React, {useState} from 'react';
import {
    Alert,
    Box,
    Grid,
    IconButton,
    Modal,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {dateYearFormatter} from "../../utils/formatters.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import StyledButton from "../StyledButton.jsx";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import WorkoutInfo from "../workout/WorkoutInfo.jsx";

function WorkoutsTable({workouts, setChange}) {
    const [error, setError] = useState('');
    const [workoutDetails, setWorkoutDetails] = useState(null);
    const details = useDropdownMenu();
    const openDetails = (value) => {
        details.handleOpen();
        setWorkoutDetails(value);
    }
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Workout routine</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Note</TableCell>
                            <TableCell align='center'>Details</TableCell>
                            <TableCell align='center'>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workouts?.map(workout => (
                            <WorkoutRow
                                workout={workout}
                                key={workout._id}
                                setChange={setChange}
                                setError={setError}
                                openDetails={openDetails}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={details.open}
                onClose={details.handleClose}
            >
                <Box sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    m: 0,
                    p: 0,
                    overflow: 'hidden',
                }}>
                    <WorkoutInfo workout={workoutDetails}/>
                </Box>
            </Modal>
            {error ? (
                <Snackbar
                    open={!!error}
                    severity='true'
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setError('')}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        {error}
                    </Alert>
                </Snackbar>
            ) : null}
        </>
    );
}

function WorkoutRow({workout, setError, setChange, openDetails}) {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const handleDelete = async () => {
        try {
            await axiosPrivate.delete(`workouts/?id=${workout._id}&user=${auth.user}`)
            setChange(v => !v);
        } catch (e) {
            setError('Server error. Try again later');
        }
    }
    const note = workout?.note.length > 40 ? `${workout?.note}...` : workout?.note;

    return (
        <TableRow
            key={workout._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>
                <Grid container gap={1}>
                    <Box
                        component='img'
                        src={workout?.icon}
                        sx={{width: '30px'}}
                    />
                    <Typography>{workout?.name}</Typography>
                </Grid>
            </TableCell>
            <TableCell align='center'>{dateYearFormatter(workout?.finishedAt)}</TableCell>
            <TableCell align='center'>
                <Tooltip title={workout?.note?.length > 40 ? workout?.note : ''}>
                    <Box>
                    {note || 'No note'}
                    </Box>
                </Tooltip>
            </TableCell>
            <TableCell align='center'>
                <StyledButton onClick={() => openDetails(workout)}>Details</StyledButton>
            </TableCell>
            <TableCell align='center' width='50px'>
                <IconButton size='small' onClick={handleDelete}>
                    <DeleteIcon
                        fontSize="small"
                        sx={{color: 'orangered'}}/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default WorkoutsTable;