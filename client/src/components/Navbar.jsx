import React from 'react';
import CustomNavLink from "./customNavLink.jsx";
import {Link, useNavigate} from "react-router-dom";
import '../Navbar.css'
import useAuth from "../hooks/useAuth.js";
import useLogout from "../hooks/useLogout.js";
import ProfileMenu from "./ProfileMenu.jsx";
import {Avatar} from "@mui/material";
import ProfileAvatar from "./ProfileAvatar.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";

function Navbar(props) {
    const {auth} = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    const avatar = `https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person.png`
    const dropdownMenu = useDropdownMenu();
    return (
        <nav>
            <div className="left">
                <Link className='logo' to='/'>
                    <img src="/public/logo.jpg" alt=""/>
                </Link>
                <CustomNavLink to='/'>Home</CustomNavLink>
                <CustomNavLink to='/about'>About us</CustomNavLink>
                <CustomNavLink to='/workoutPlans'>Workout plans</CustomNavLink>
                <CustomNavLink to='/exercises'>Exercises</CustomNavLink>
                <CustomNavLink to='/body'>Body</CustomNavLink>
            </div>
            <div className="right">
                {auth.user ? (<>
                        <div onClick={dropdownMenu.handleOpen}
                             ref={dropdownMenu.anchorRef}>
                        <ProfileAvatar />

                        </div>
                        <ProfileMenu
                            anchorEl={dropdownMenu.anchorRef.current}
                            open={dropdownMenu.open}
                            onClose={dropdownMenu.handleClose}
                        />
                    </>
                    /*<BasicMenu/>*/
                ) : (
                    <>
                        <CustomNavLink to='/login'>Log in</CustomNavLink>
                        <CustomNavLink to='/register'>Sign up</CustomNavLink>
                    </>
                )}
                {/*<CustomNavLink to='/register'>🙍‍♂️</CustomNavLink>*/}
            </div>
        </nav>
        // <div className='navbar container'>
        //     <Link to='/'><img width={40} src="logo.jpg" alt="GymFlow logo"/></Link>
        //     <nav
        //         // style={{display: "flex", gap: '10px'}}
        //         className='nav-links'
        //     >
        //
        //         <CustomNavLink to='/'>Home</CustomNavLink>
        //         <CustomNavLink to='/about'>About us</CustomNavLink>
        //         <CustomNavLink to='/exercises'>Exercises</CustomNavLink>
        //         <CustomNavLink to='/body'>Body</CustomNavLink>
        //
        //         <CustomNavLink to='/login'>Login</CustomNavLink>
        //         <CustomNavLink to='/register'>Sign up</CustomNavLink>
        //         <CustomNavLink to='/register'>🙍‍♂️</CustomNavLink>
        //
        //         {/*<CustomNavLink to='/stats'>Stats</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/settings'>Settings</CustomNavLink>*/}
        //
        //         {/*<CustomNavLink to='/'>Home</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/about'>About</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/login'>Login</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/register'>Register</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/stats'>Stats</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/body'>Body</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/settings'>Settings</CustomNavLink>*/}
        //         {/*<CustomNavLink to='/exercises'>Exercises</CustomNavLink>*/}
        //     </nav>
        // </div>
        // </>
    );
}

export default Navbar;