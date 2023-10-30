import React, {useEffect, useState} from 'react';
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import EntryComposer from "./EntryComposer.jsx";
import {Box, Card, Chip, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import CustomLineChart from "./CustomLineChart.jsx";
import TableDialog from "./TableDialog.jsx";
import ChartReplacement from "./ChartReplacement.jsx";

function WeightInfo({refresh}) {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const [change, setChange] = useState(false);
    const [height, setHeight] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getHeight = async () => {
            try {
                const response = await axiosPrivate.get(`/user/?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setHeight(response.data?.user?.[0]?.height || 0);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getHeight();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [refresh]);
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getWeightHistory = async () => {
            try {
                const response = await axiosPrivate.get(`/user/weight/all?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data.data.reverse());
                }
            } catch (e) {
                console.log(e);
            }
        }
        getWeightHistory();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [change]);
    const latestWeight = data?.[data?.length - 1]?.weight;

    return (
        <Card sx={{
            boxSizing: 'border-box',
            borderRadius: 2,
            p: 2.25,
            width: '100%',
            height: '100%',
            boxShadow: "none",
            backgroundColor: 'floralwhite'
            // overflowY: 'scroll',
        }}
        >
            {/*<Grid container gap={3} wrap='nowrap'>*/}
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
            {data.length > 1 ? (<>
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
                    backgroundColor: 'darkorange',
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
                        apiPath='/user/weight/all/'
                        open={openDialog}
                        handleClose={() => setOpenDialog(false)}
                        label='Weight (kg)'
                    />
                ) : null}
            </>) : <ChartReplacement/>}
            {/*</Grid>*/}
        </Card>


        // </Grid>
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
