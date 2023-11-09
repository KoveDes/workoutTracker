import React, {useState} from 'react';
import {Box, Grid, Pagination, Typography} from "@mui/material";
import useFetch from "../hooks/useFetch.js";
import WorkoutsTable from "../components/home/WorkoutsTable.jsx";
import HistoryCalendar from "../components/home/HistoryCalendar.jsx";
import useAuth from "../hooks/useAuth.js";
import Missing from "./Missing.jsx";
import Welcome from "./Welcome.jsx";

function History() {
    const [change, setChange] = useState(false);
    const {auth} = useAuth();
    const [page, setPage] = useState(1);
    const {response: workouts} = useFetch(({
        method: 'get',
        path: `workouts/all/10/${10 * page - 10}`,
        deps: [change],
    }))
    const total = Math.ceil(workouts?.count / 10) || 1;
    const data = workouts?.data?.reverse();

    if(!auth?.user) {
        return <Welcome />
    }


    return (
        <Grid container direction='row' justifyContent='space-around' alignItems='center' wrap={'nowrap'}>
            <Grid item container direction='column' alignItems='center' >
                <Box>Workouts calendar</Box>
                <HistoryCalendar/>
            </Grid>
            <Grid item container direction='column' alignItems='center'>
            <Typography>Workout History</Typography>
            <Box>
                <WorkoutsTable workouts={data} setChange={setChange}/>
            </Box>
            <Pagination
                sx={{mt: '15px'}}
                onChange={(e, value) => setPage(value)}
                page={page}
                count={total}
            />
            </Grid>
        </Grid>
    );
}

export default History;