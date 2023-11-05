import React, {useEffect, useState} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import EntryComposer from "./EntryComposer.jsx";
import CustomLineChart from "./CustomLineChart.jsx";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TableDialog from "./TableDialog.jsx";
import {niceParam} from "../utils/formatters.js";
import ChartReplacement from "./ChartReplacement.jsx";

function BodyPart(props) {
    const setRefresh = useOutletContext();
    const {bodyPart} = useParams();
    const [change, setChange] = useState();
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const currentSize = data?.[data?.length - 1]?.size;

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getBodyPartInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/body/${bodyPart}?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data.data.reverse());
                }
            } catch (e) {
                console.log(e);
                setData([]);
            }
        }
        getBodyPartInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [bodyPart, change])
    return (
        <Card sx={{
            boxSizing: 'border-box',
            borderRadius: 2,
            p: 2.25,
            width: '100%',
            height: '100%',
            boxShadow: "none",
            backgroundColor: 'floralwhite',
            // display: 'flex',
            // flexDirection: 'column',
            position: 'relative',

            // overflowY: 'scroll',
        }}
        >
            <Typography
                sx={{
                    position: 'absolute',
                    right: 0,
                    pr: 2.25,
                    color: 'coral'
                }}
                variant='h4'
                fontWeight='500'
                textTransform='uppercase'
                letterSpacing={3}
            >
                {niceParam(bodyPart || '')}
            </Typography>
            <Grid container direction='column' gap={3} justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Stack spacing={1}>
                    <Typography variant="h6" color="textSecondary" textAlign={'left'} fontWeight='500'>
                        Current size
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Typography variant="h6" color="inherit">
                                {currentSize || 0} cm
                            </Typography>

                        </Grid>
                    </Grid>

                </Stack>
                <EntryComposer
                    payloadParam='size'
                    apiPath={`/body/${bodyPart}`}
                    setChange={setChange}
                    data={currentSize}
                    buttonText='size'
                    adornment='cm'
                    setRefresh={setRefresh}
                />

            </Grid>
            {data.length > 1 ? (<>
                <Box sx={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    margin: '25px 0',
                }}>
                    <CustomLineChart data={data} dataKey='size' label='Size (cm)'/>
                </Box>
                <Button
                    variant='text' sx={{
                    backgroundColor: 'darkorange',
                    color: 'white',
                    "&:hover": {
                        backgroundColor: 'orangered',
                    },

                }}
                    onClick={() => setOpenDialog(true)}
                >
                    Show history
                </Button>
                {openDialog ? (
                    <TableDialog
                        setChange={setChange}
                        payloadParam='size'
                        apiPath={`/body/${bodyPart}`}
                        open={openDialog}
                        handleClose={() => setOpenDialog(false)}
                        label='Size (cm)'
                        setRefresh={setRefresh}
                    />
                ) : null}
            </>) : <ChartReplacement />
                }

        </Card>
    );
}

export default BodyPart;