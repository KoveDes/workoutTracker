import React from 'react';
import {MenuItem, MenuList, Popover} from "@mui/material";
import useLogout from "../../hooks/useLogout.js";
import {useNavigate} from "react-router-dom";

function ProfileMenu({anchorEl, setAnchorEl, onClose}) {
    const logout = useLogout();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await logout();
        navigate('/');
        localStorage.removeItem('persist');
        setAnchorEl(null);
    }

    return (
        <>
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
                open={Boolean(anchorEl)}
                slotProps={{paper: {sx: {width: 150, boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 14px", mt: '0'}}}}
            >
                <MenuList
                    dense
                    p='8px'
                >
                    <MenuItem onClick={() => {
                        onClose()
                        navigate('/profile')
                    }}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                        onClose();
                        navigate('/goals')
                    }}>
                        Goals
                    </MenuItem>
                    <MenuItem onClick={() => {
                        onClose();
                        navigate('/records')
                    }}>
                        Records
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>
                        Sign out
                    </MenuItem>

                </MenuList>
            </Popover>
        </>
    );
}


export default ProfileMenu;