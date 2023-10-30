import React, {useEffect, useState} from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import EntryComposer from "./EntryComposer.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";

function HeightInfo({setRefresh}) {
    const [change, setChange] = useState(false);
    const [height, setHeight] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getBodyPartInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/user/?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setHeight(response.data?.user?.[0]?.height || 0);
                    setRefresh(v => !v);
                }
            } catch (e) {
                console.log(e);
                setHeight(0);
            }
        }
        getBodyPartInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [change]);

    return (
        <Stack spacing={1}>
            <Typography variant="subtitle1" color="textSecondary" textAlign={'left'} fontWeight='500'>
                Height
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h6" color="inherit">
                        {height} cm
                    </Typography>
                </Grid>

            </Grid>
            <Grid container alignItems="center">
                <Grid item>
                    <EntryComposer
                        payloadParam='height'
                        apiPath={`/user`}
                        setChange={setChange}
                        data={height}
                        buttonText='height'
                        method='patch'
                        adornment='cm'
                    />

                </Grid>
            </Grid>

        </Stack>
    );
}

export default HeightInfo;