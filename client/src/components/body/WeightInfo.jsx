import React, {useState} from 'react';
import EntryComposer from "../EntryComposer.jsx";
import {Box, Card, Chip, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import CustomLineChart from "./CustomLineChart.jsx";
import TableDialog from "../TableDialog.jsx";
import ChartReplacement from "./ChartReplacement.jsx";
import useFetch from "../../hooks/useFetch.js";

function WeightInfo({refresh}) {
    const [change, setChange] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {response: heightRes} = useFetch(({
        method: 'get',
        path: 'user',
        deps: [refresh],
    }))
    const {response} = useFetch(({
        method: 'get',
        path: 'user/weight/all',
        deps: [change],
    }))
    const height = heightRes?.user?.[0]?.height || 0;

    const data = response?.data && [...response?.data].reverse();
    const latestWeight = data && data?.[data?.length - 1]?.weight;


    return (
        <Card sx={{
            boxSizing: 'border-box',
            borderRadius: '25px',
            p: 2.25,
            width: '100%',
            height: '100%',
            boxShadow: "none",
            backgroundColor: 'lavender',
            textAlign: 'center'
        }}
        >
            <Grid container direction='column' gap={3} justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1" color="textSecondary" textAlign={'left'} fontWeight='500'>
                        Current weight
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Typography variant="h6" color="inherit">
                                {latestWeight} kg
                            </Typography>

                        </Grid>
                        <Grid item>
                            {height > 1 ? <BMIAnalytics weight={latestWeight} height={height}/> : null}
                        </Grid>
                    </Grid>

                </Stack>
                <EntryComposer
                    payloadParam='weight'
                    apiPath={`/user`}
                    setChange={setChange}
                    data={latestWeight}
                    buttonText='weight'
                    method='patch'
                    adornment='kg'
                />

            </Grid>
            {data?.length > 1 ? (<>
                <Box sx={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    margin: '25px 0',
                }}>
                    <CustomLineChart data={data} dataKey='weight' label='Weight (kg)'/>
                </Box>
                <Button
                    variant='text' sx={{
                    backgroundColor: '#3b3b3f',
                    color: 'white',
                    "&:hover": {
                        backgroundColor: 'orangered',
                    }
                }}
                    onClick={() => setOpenDialog(true)}
                >
                    Show history
                </Button>
                {openDialog ? (
                    <TableDialog
                        setChange={setChange}
                        payloadParam='weight'
                        apiPath='/user/weight/all'
                        open={openDialog}
                        handleClose={() => setOpenDialog(false)}
                        label='Weight (kg)'
                    />
                ) : null}
            </>) : (
                <Box sx={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    margin: '25px 0',
                }}>
                    <ChartReplacement/>
                </Box>)
            }
        </Card>
    );
}


function BMIAnalytics({weight, height}) {
    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
    const status = bmi < 18.4 ? 'Underweight' : bmi < 24.9 ? 'Normal' : bmi < 39.9 ? 'Overweight' : 'Obese';
    const color = bmi < 18.4 ? 'yellow' : bmi < 24.9 ? 'lightgreen' : bmi < 39.9 ? 'orange' : bmi >= 39.9 ? 'red' : 'inherit';
    return (
        <Chip
            variant="combined"
            label={`BMI ${bmi}% (${status})`}
            sx={{ml: 1.25, p: 1.5, backgroundColor: !bmi ? 'white' : color,}}
            size="medium"
        />
    )
}

export default WeightInfo;
