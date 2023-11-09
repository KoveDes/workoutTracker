import React, {useEffect} from 'react';
import {Box, Grid, Modal, Typography} from "@mui/material";
import ReactConfetti from "react-confetti";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useWindowSize from "../hooks/useWindowSize.js";
import {dateYearFormatter, niceParam} from "../utils/formatters";

function GoalFinished({goal, message, isArray = false}) {
    const openGoal = useDropdownMenu();
    const {width, height} = useWindowSize()

    useEffect(() => {
        if (goal) {
            openGoal.handleOpen();
        }
    }, [])
    return (

        <Box>
            <Modal
                open={openGoal.open}
                onClose={openGoal.handleClose}
            >
                <Box sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    borderRadius: '15px',
                    backgroundColor: 'lavender',
                    boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                    p: 2,
                    overflow: 'hidden',
                }}>
                    <ReactConfetti width={width * 0.45} height={height}/>

                    <Grid container direction='column' alignItems='center' gap={0}>
                        <Typography
                            variant='h4'
                            fontWeight='bold'
                            sx={{
                                textAlign: 'center',
                                color: '#3b3b3f',
                                animation: 'blurAnimation 1s infinite',
                                mb: '20px'
                            }}>
                            {message}
                        </Typography>
                        {!isArray ? (
                            <Details goal={goal} />
                        ) : (
                            goal?.map((item) => (
                                <Box key={item._id}>
                                <Details goal={item} />
                                <br/>
                                </Box>
                            ))
                        )}
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}

function Details({goal}) {
    const adornment = (goal.category.includes('weight') || goal.category === 'load') ? 'kg' : goal.category === 'workoutCount' ? 'workouts' : 'cm'
    const name = goal?.category === 'weightUp' ? 'Gain Weight' : goal.category === 'weightDown' ? 'Lose weight' :
        goal.category === 'workoutCount' ? 'Perform workouts' : goal.category === 'measurement' ? `Set new ${goal?.bodyParameter} size` : `Set new record in ${goal?.exercise}`
    return (
        <>
            <Typography
                variant='overline'
                fontWeight='bold'>
                Start Date {dateYearFormatter(goal.startedAt)}
            </Typography>
            <Typography
                variant='overline'
                fontWeight='bold'>
                Category: {name}
            </Typography>
            <Typography
                variant='h5'
                fontWeight='bold'
                sx={{
                    color: 'orangered',
                }}>
                You reached {goal.endValue} {adornment}
                {goal.category === 'measurement' ? ` size in ${niceParam(goal?.bodyParameter)}` :
                    goal.category === 'load' ? ` load in ${goal?.exercise}` : ''}</Typography>
        </>
    )
}

export default GoalFinished;


