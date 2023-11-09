import React, {useState} from 'react';
import {Alert, Box, MenuItem, MenuList, Popover, Snackbar} from "@mui/material";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import SettingsImg from '../assets/Settings.png'

function OptionsMenu({setChange,width, data, apiPath, handleEdit, parentId, isRoutine, showEdit = true}) {
    const dropdownMenu = useDropdownMenu();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            if (isRoutine) {
                await axiosPrivate.delete(`${apiPath}?id=${parentId}&user=${auth.user}&routineId=${data._id}`)
            } else {
                await axiosPrivate.delete(`${apiPath}?id=${data?._id}&user=${auth.user}${parentId ? `&routineId=${parentId}` : ''}`)
            }
            setChange(v => !v);
        } catch (e) {
            setError('Server error. Try again later');
        }
    }

    return (
        <Box sx={{position: 'absolute', right: 0, top: 0, m: '7px', cursor: 'pointer'}}>
            <Box
                onClick={dropdownMenu.handleOpen}
                ref={dropdownMenu.anchorRef}
                style={{
                    width:  width || '30px',
                    height: width || '30px',
                    borderRadius: '50%',
                }}
            >
                <Box component='img'
                     style={{width: '100%', height: '100%'}}
                     src={SettingsImg}
                     alt="Gear"/>
            </Box>

            <Popover
                anchorEl={dropdownMenu.anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={dropdownMenu.handleClose}
                open={dropdownMenu.open}
                slotProps={{
                    paper: {
                        sx: {boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 14px", mt: '0'}
                    }
                }}
            >

                <MenuList
                    dense
                    sx={{p: '8px'}}
                >
                    {showEdit &&
                        <MenuItem onClick={() => {
                            dropdownMenu.handleClose();
                            handleEdit()
                        }}>
                            Edit
                        </MenuItem>
                    }

                    <MenuItem onClick={() => {
                        dropdownMenu.handleClose();
                        handleDelete()
                    }}>
                        Delete
                    </MenuItem>
                </MenuList>
            </Popover>
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
        </Box>
    );
}

export default OptionsMenu;