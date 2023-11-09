import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";
import Woman from '../../assets/Woman.png'
import Person from '../../assets/Person.png'

function AccountProfile({user}) {
    return (
        <Card
            sx={{
                boxShadow: 'none',
                backgroundColor: 'transparent',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <img src={user?.gender === 'male' ? Person : Woman} alt="" style={{width: '160px'}}/>
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        {user.username}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.gender} {user.age}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AccountProfile;