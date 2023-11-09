import React from 'react';
import {Avatar, Grid} from "@mui/material";
import useAuth from "../../hooks/useAuth.js";
import Woman from '../../assets/Woman.png'
import Person from '../../assets/Person.png'

function ProfileAvatar() {
    const {user} = useAuth();
    return (
        <Grid container>
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
                }}>
                <img
                    style={{width: '85%'}}
                    className='avatar' src={user?.gender === 'male' ? Person : Woman} alt=""/>

            </Avatar>

        </Grid>
    );
}

export default ProfileAvatar;