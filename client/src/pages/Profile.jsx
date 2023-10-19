import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import AccountProfile from "../components/AccountProfile.jsx";
import {AccountProfileDetails} from "../components/accountProfileDetails.jsx";
import {useLoaderData} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";




function Profile(props) {
    const [user,setUser] = useState(null);
    const [change, setChange] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/user`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setUser(response.data.user[0]);
                }
            } catch (e) {
                console.log(e);
                setUser({});
            }
        }
        getUserInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [change]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    height: '73vh',
                }}
            >
                <Container maxWidth="lg" >
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Account
                            </Typography>
                        </div>
                        <div>
                            <Grid
                                container
                                alignItems={'center'}
                                justifyContent='center'
                                spacing={3}
                            >
                                <Grid item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    {user  ? <AccountProfile user={user} change={change} /> : null}
                                </Grid>
                                <Grid item
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    {user ?<AccountProfileDetails user={user} setChange={setChange} /> : null}
                                </Grid>

                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Profile;