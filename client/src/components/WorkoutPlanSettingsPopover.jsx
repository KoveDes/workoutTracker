import React, {useCallback, useRef, useState} from 'react';
import {Avatar, Grid, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import useLogout from "../hooks/useLogout.js";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import WorkoutPlanControls from "./WorkoutPlanControls.jsx";

function WorkoutPlanSettingsPopover({anchorEl, open, onClose, setChange, id={id}, plan}) {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const handleEdit = () => {

    }
    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(`/workoutPlan?id=${id}&user=${auth.user}`)
            setChange(v => !v);
        }
        catch(e) {
            alert('Error');
        }
    }

    return (
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={onClose}
                open={open}
                PaperProps={{sx: {width: 200, boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 14px", mt: '0'}}}
            >

                <MenuList
                    disablePadding
                    dense
                    sx={{
                        p: '8px',

                    }}
                >
                    {/*<MenuItem onClick={handleEdit}>*/}
                    {/*    Set as Main*/}
                    {/*</MenuItem>*/}
                    <MenuItem onClick={handleEdit}>
                        <WorkoutPlanControls workoutPlan={plan} setChange={setChange}/>

                    </MenuItem>
                    <MenuItem onClick={handleDelete} >
                        Delete
                    </MenuItem>

                </MenuList>
            </Popover>
    );
}


export default WorkoutPlanSettingsPopover;