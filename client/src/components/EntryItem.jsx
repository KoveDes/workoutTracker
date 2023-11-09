import React, {useState} from 'react';
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Alert, IconButton, Snackbar, TableCell, TableRow, TextField, Typography} from "@mui/material";
import {dateYearFormatter} from "../utils/formatters.js";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

function EntryItem({data, setChange, setReload, setShowGoal, payloadParam, setRefresh, apiPath, dataValue}) {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(dataValue);
    const {auth} = useAuth();
    const [error, setError] = useState('')
    const axiosPrivate = useAxiosPrivate();
    const handleEdit = (e) => {
        setInputValue(e.target.value);
    }
    const handleDeleteClick = async () => {
        try {
            const response = await axiosPrivate.delete(`${payloadParam === 'weight' ? '/user/weight' : apiPath}?id=${data._id}&user=${auth.user}`)
            setChange(c => !c);
            setReload(v => !v);
            setRefresh && setRefresh(c => !c);
            if (response?.data?.goalMessage) {
                setShowGoal(response?.data?.goalMessage)
            }

        } catch (e) {
            setError('Server error. Try again later');
        }
    }
    const handleSaveClick = async () => {

        try {
            const response = await axiosPrivate.patch(payloadParam === 'weight' ? '/user/weight' : apiPath,
                JSON.stringify({
                    user: auth.user,
                    id: data._id,
                    [payloadParam]: Number.parseInt(inputValue),
                }))
            if (response?.data?.goalMessage) {
                setShowGoal(response?.data?.goalMessage)
            }
            setEditing(false);
            setChange(c => !c);
            setReload(c => !c);
            setRefresh && setRefresh(c => !c);

        } catch (e) {
            setError('Server error. Try again later');
        }

    }
    return (
        <TableRow>
            <TableCell sx={{}}>
                {editing === true ? (
                    <>
                        <TextField
                            error={inputValue < 30 || inputValue > 442}
                            type='number'
                            variant='outlined'
                            size='small'
                            helperText={inputValue < 30 || inputValue > 442 ?
                                '(30kg - 442kg allowed)' : ''}
                            value={inputValue}
                            onChange={handleEdit}
                        />
                    </>
                ) : (
                    <Typography variant='p'>{dataValue}</Typography>
                )}
            </TableCell>
            <TableCell align="right">{dateYearFormatter(data.date)}</TableCell>
            <TableCell align='right'>
                {editing === true ? (
                        <>
                            {(inputValue < 30 || inputValue > 500) ? null : (
                                <IconButton
                                    size='small' onClick={handleSaveClick}>
                                    <DoneIcon fontSize="small" sx={{color: 'black'}}/>
                                </IconButton>
                            )}
                            <IconButton size='small' onClick={() => {
                                setEditing(false)
                                setInputValue(dataValue)
                            }}>
                                <ClearIcon fontSize="small" sx={{color: 'black'}}/>
                            </IconButton>

                        </>)
                    :
                    (
                        <>
                            <IconButton size='small' onClick={() => setEditing(true)}><EditIcon fontSize="small"
                                                                                                sx={{color: 'black'}}/></IconButton>
                            <IconButton size='small' onClick={handleDeleteClick}><DeleteIcon fontSize="small"
                                                                                             sx={{color: 'orangered'}}/></IconButton>
                        </>
                    )}
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
            </TableCell>
        </TableRow>

    );
}

export default EntryItem;

