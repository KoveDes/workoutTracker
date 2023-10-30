import React from 'react';
import {MenuItem, MenuList, Popover} from "@mui/material";
import useLogout from "../hooks/useLogout.js";
import {useNavigate} from "react-router-dom";
import useDropdownMenu from "../hooks/useDropdownMenu.js";

function ProfileMenu({anchorEl, open, onClose}) {
    const dropdownMenu = useDropdownMenu();
    const logout = useLogout();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await logout();
        navigate('/');
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
                open={open}
                PaperProps={{sx: {width: 200, boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 14px", mt: '0'}}}
            >
                {/*<Box*/}
                {/*    justifyContent='center'*/}
                {/*    alignItems='center'*/}
                {/*    sx={{*/}
                {/*        py: 1.5,*/}
                {/*        px: 2,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Typography variant="overline" fontFamily='inherit'>*/}

                {/*        Profile*/}
                {/*    </Typography>*/}
                {/*    <Typography*/}
                {/*        color="text.secondary"*/}
                {/*        variant="body2"*/}
                {/*    >*/}
                {/*        {user?.username || user?.login}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
                {/*<Divider />*/}
                <MenuList
                    disablePadding
                    dense
                    sx={{
                        p: '8px',

                    }}
                >
                    {/*<MenuItem onClick={handleSignOut}>*/}
                    {/*</MenuItem>*/}

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
                    <MenuItem onClick={handleSignOut}>
                        Sign out
                    </MenuItem>

                </MenuList>
            </Popover>
        </>
    );
}


export default ProfileMenu;