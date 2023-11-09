import React, {useState} from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import EntryComposer from "../EntryComposer.jsx";
import useFetch from "../../hooks/useFetch.js";

function HeightInfo({setRefresh}) {
    const [change, setChange] = useState(false);
    const {response} = useFetch(({
        method: 'get',
        path: 'user',
        deps: [change],
        refresh: setRefresh,
    }))
    const height = response?.user?.[0]?.height || 0;
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