import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import CountStat from "../components/records/CountStat.jsx";
import RecordItem from "../components/records/RecordItem.jsx";

function Records() {
    const [stats, setStats] = useState({});
    const [search, setSearch] = useState('');
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const responseRecords = await axiosPrivate.get(`stats/records`, {
                    signal: controller.signal
                })
                const sortedRecords = responseRecords?.data.sort((a, b) => {
                    return b.maxLoad - a.maxLoad;
                });

                const responseStats = await axiosPrivate.get(`stats`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setStats({
                        ...responseStats?.data,
                        records: sortedRecords,
                    });
                }
            } catch (e) {
                setStats({});
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [])

    const filteredRecords = stats?.records?.filter(record =>
        record.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <Grid container direction='column' alignItems='center' gap={3} p='5% 10%'>

            <Grid container gap={5} justifyContent='center'>
                <CountStat label='Total sets' value={stats?.setsCount || 0}/>
                <CountStat label='Total workouts' value={stats?.workoutsCount || 0}/>
                <CountStat label='Total reps' value={stats?.repsCount || 0}/>
            </Grid>
            <Typography variant='h3'>Records</Typography>
            {stats?.records ? (<Box>
                <Divider>
                    <TextField
                        label='exercise'
                        size='small'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{width: '100px', textAlign: 'center'}}
                    />
                </Divider>
                    {filteredRecords.map(record => (
                    <RecordItem
                        key={record.name}
                        value={record.maxLoad + ' kg'}
                        name={record.name}
                    />
                ))}
            </Box>
                ) : <Typography>No data</Typography>}
        </Grid>
    );
}

export default Records;