import React from 'react';
import {Avatar, Grid} from "@mui/material";
import useAuth from "../hooks/useAuth.js";

function ProfileAvatar(props) {
    const {user} = useAuth();
    const avatar = `https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/${user?.gender === 'male' ? "Person" : "Woman"}.png`

    return (
        <Grid sx={{
            // border: '2px solid #3d3d3c',
            // padding: '0 10px',
            // borderRadius: '25px',
            // backgroundColor: 'blanchedalmond',
            // cursor: 'pointer',
            // '&:hover' : {
            // }
        }}
        >
            <h4
                color="text.secondary"
            >
                {user?.username || user?.login}
            </h4>
            <Avatar

                alt={'username'}
                sx={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    // backgroundImage: "linear-gradient(#fffa63, #f9ab49)",
                    // border: `2px solid #3b3b3f`,
                }}>
                <img
                    style={{width: '85%'}}
                    className='avatar' src={avatar} alt=""/>

            </Avatar>

        </Grid>
    );
}

export default ProfileAvatar;