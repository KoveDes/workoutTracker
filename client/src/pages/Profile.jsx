import {useState} from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import AccountProfile from "../components/profile/AccountProfile.jsx";
import {AccountProfileDetails} from "../components/profile/accountProfileDetails.jsx";
import useFetch from "../hooks/useFetch.js";


function Profile() {
    const [change, setChange] = useState(false);
    const {response} = useFetch(({
        method: 'get',
        path: '/user',
        deps: [change],
    }))
    const user = response?.user?.[0];


    return (
        <Box
            component="main"
            // py={8}
        >
            <Container maxWidth="lg">
                <Typography variant="h4">
                    Account
                </Typography>
                <Grid
                    container
                    direction='column'
                    sx={{
                        boxShadow: 'none',
                        backgroundColor: 'lavender',
                        borderRadius: '25px',
                    }}
                >
                    {user ? <AccountProfile user={user} change={change}/> : null}
                    {user ? <AccountProfileDetails user={user} setChange={setChange}/> : null}
                </Grid>
            </Container>
        </Box>
    );
}

export default Profile;