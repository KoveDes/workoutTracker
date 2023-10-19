import React from 'react';
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";

function AccountProfile({user}) {

    const avatar = `https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/${user.gender === 'male' ? "Person" : "Woman"}.png`
    return (
        <Card
        >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <img src={avatar} alt="" style={{width: '160px'}}/>
                    {/*<Avatar*/}
                    {/*    src={user.avatar.woman}*/}
                    {/*    sx={{*/}
                    {/*        height: 160,*/}
                    {/*        mb: 2,*/}
                    {/*        width: 160*/}
                    {/*    }}*/}
                    {/*/>*/}
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