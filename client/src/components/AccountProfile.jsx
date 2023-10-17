import React from 'react';
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";

function AccountProfile(props) {
    const user = {
        city: 'Los Angeles',
        country: 'USA',
        jobTitle: 'Senior Developer',
        name: 'Anika Visser',
        timezone: 'GTM-7',
        avatar: 'https://myteenwebcam.com/fapp/gifs/516275443ca4e6303ac82e310ae3d430.gif'
    }
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        {user.name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.city} {user.country}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.timezone}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AccountProfile;