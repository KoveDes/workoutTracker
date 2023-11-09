import React, {memo} from 'react';
import CustomNavLink from "./customNavLink.jsx";
import {Link} from "react-router-dom";
import '../Navbar.css'
import useAuth from "../hooks/useAuth.js";
import ProfileMenu from "./profile/ProfileMenu.jsx";
import ProfileAvatar from "./profile/ProfileAvatar.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import {Box, Grid, Typography} from "@mui/material";

function Navbar() {
    const {auth} = useAuth();
    const dropdownMenu = useDropdownMenu();
    return (
        <Grid
            component='nav'
            container
            alignItems='center'
            justifyContent='space-between'
            px='3%'
            sx={{
                height: '70px',
                backgroundColor: '#f0f2f6',
            }}
        >

            <Link to='/'>
                <Typography variant='h6' fontWeight='bold' sx={{color: '#5200ff'}}>GymTrackr</Typography>
            </Link>
            <Box>
                {auth?.user &&(<>
                <CustomNavLink style={{marginLeft: '10px'}} to='/'>History</CustomNavLink>
                <CustomNavLink style={{marginLeft: '10px'}} to='/workoutPlans'>Workout plans</CustomNavLink>
                <CustomNavLink style={{marginLeft: '10px'}} to='/body'>Body</CustomNavLink>
                <CustomNavLink style={{marginLeft: '10px'}} to='/exercises'>Exercises</CustomNavLink>
                </>)}

            </Box>
            <div className="right">
                {auth.user ? (
                    <>
                        <Box
                            onClick={dropdownMenu?.handleOpen}
                            ref={dropdownMenu?.anchorRef}>
                            <ProfileAvatar/>
                        </Box>
                        <ProfileMenu
                            anchorEl={dropdownMenu.anchorRef.current}
                            open={dropdownMenu.open}
                            onClose={dropdownMenu.handleClose}
                        />
                    </>
                ) : (
                    <>
                        <CustomNavLink to='/login'>Log in</CustomNavLink>
                        <CustomNavLink to='/register'>Sign up</CustomNavLink>
                    </>
                )}
            </div>
        </Grid>
    );
}

export default memo(Navbar);