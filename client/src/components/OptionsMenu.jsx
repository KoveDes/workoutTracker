import React from 'react';
import {Box, MenuItem, MenuList, Popover} from "@mui/material";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";

function OptionsMenu({setChange, data, apiPath,handleEdit, parentId, isRoutine, showEdit=true}) {
    const dropdownMenu = useDropdownMenu();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    const handleDelete = async () => {
        try {
            if (isRoutine) {
                const response = await axiosPrivate.delete(`${apiPath}?id=${parentId}&user=${auth.user}&routineId=${data._id}`)
            } else {
                const response = await axiosPrivate.delete(`${apiPath}?id=${data?._id}&user=${auth.user}${parentId ? `&routineId=${parentId}` : ''}`)
            }
            setChange(v => !v);
        } catch (e) {
            alert('Error');
        }
    }

    return (
        <Box sx={{position: 'absolute', right: 0, top: 0, m: '7px'}}>
            <Box
                onClick={dropdownMenu.handleOpen}
                ref={dropdownMenu.anchorRef}
                style={{
                    // backgroundColor: 'red',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                }}
            >
                <Box component='img'
                     style={{width: '100%', height: '100%'}}
                     src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png"
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
                PaperProps={{sx: {boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 14px", mt: '0'}}}
            >

                <MenuList
                    dense
                    sx={{p: '8px'}}
                >
                    {showEdit &&
                    <MenuItem onClick={() => {
                        dropdownMenu.handleClose(),
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
        </Box>
    );
}

export default OptionsMenu;