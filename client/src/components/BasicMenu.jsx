import React from 'react';
import Button from "@mui/material/Button";
import {Avatar, Menu, MenuItem} from "@mui/material";

function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const avatar = `https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person.png`

    return (
        <div>
            <Avatar
                onClick={handleClick}
                alt={'username'}
                sx={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    // backgroundImage: "linear-gradient(#fffa63, #f9ab49)",
                    border: `2px solid #3b3b3f`,
                }}>
                <img
                    style={{width: '85%'}}
                    className='avatar' src={avatar} alt=""/>

            </Avatar>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu>
        </div>
    );
}

export default BasicMenu;