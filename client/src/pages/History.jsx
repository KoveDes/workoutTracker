import React, {useState} from 'react';
import {Box, Grid, Pagination, SvgIcon, Typography} from "@mui/material";
import useFetch from "../hooks/useFetch.js";
import WorkoutsTable from "../components/home/WorkoutsTable.jsx";
import HistoryCalendar from "../components/home/HistoryCalendar.jsx";
import useAuth from "../hooks/useAuth.js";
import Welcome from "./Welcome.jsx";
import EyeImg from "../assets/Eye.png";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";

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
    console.log(workouts);

    if (!auth?.user) {
        return <Welcome/>
    }


    return (
        <Grid container direction='row' justifyContent='space-around' wrap={'nowrap'}>
            {data ? (<>
                    <Grid item container direction='column' alignItems='center'>
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
                </>)
                : !data || data?.length === 0 ? (
                    <Grid container direction='column' alignItems='center'>
                        <Typography variant='h3' fontWeight='bold' sx={{color: '#5200ff'}}>You haven't performed any workouts</Typography>
                        <Button
                            component={Link}
                            to='/workoutPlans'
                            sx={{
                                mt: 3,
                                color: '#3b3b3f',
                                fontWeight: 'bold',
                                p: '10px',
                            }}
                        >Start workout</Button>

                    </Grid>
                ) : null
            }
        </Grid>
    );
}

export default History;