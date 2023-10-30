import React, {useState} from 'react';
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {IconButton, TableCell, TableRow, TextField, Typography} from "@mui/material";
import {dateYearFormatter} from "../utils/formatters.js";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

function EntryItem({data, setChange, setReload, label, payloadParam, setRefresh,apiPath, dataValue}) {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(dataValue);
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const handleEdit = (e) => {
        setInputValue(e.target.value);
    }
    const handleDeleteClick = async (e) => {
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.delete(`${apiPath}?id=${data._id}&user=${auth.user}`,
                {signal: controller.signal})
            if (!ignore && response.statusText === 'OK') {
                setChange(c => !c);
                setReload(v => !v);
                setRefresh(c => !c);
            }

        } catch (e) {
            console.log(e);
        }
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }
    const handleSaveClick = async (e) => {
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.patch(apiPath,
                JSON.stringify({
                    user: auth.user,
                    id: data._id,
                    [payloadParam]: Number.parseInt(inputValue),
                }),
                {signal: controller.signal})
            if (!ignore) {
                setEditing(false);
                setChange(c => !c);
                setReload(c => !c);
                setRefresh(c => !c);
                console.log(response.data)
            }

        } catch (e) {
            console.log(e);
        }
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }

    // const formattedDate = new Date(data.date).toLocaleDateString('en-Gb');
    const formattedDate = data.date;

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
                                '(30kg - 442kg allowed)': ''}
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
                                                                                             sx={{color: 'black'}}/></IconButton>
                        </>
                    )}
            </TableCell>
        </TableRow>
    );
}

export default EntryItem;

