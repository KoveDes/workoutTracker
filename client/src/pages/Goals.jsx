import React, {useState} from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import GoalsButtons from "../components/goals/GoalsButtons.jsx";
import GoalItem from "../components/goals/GoalItem.jsx";
import FaceInClouds from '../assets/Face in Clouds.png';
import ConfusedFace from '../assets/Confused Face.png';
import useFetch from "../hooks/useFetch.js";

function Goals() {
    const [change, setChange] = useState();
    const {response: goals} = useFetch(({
        method: 'get',
        path: 'goal/all',
        deps: [change],
    }))
    const finishedGoals = goals ? goals.filter(goal => goal.finished === true) : [];
    const currentGoals = goals ? goals.filter(goal => goal.finished === false) : [];

    return (
        <Grid container direction='column' gap={3}>
            <GoalsButtons currentGoals={currentGoals.length} setChange={setChange}/>
            <Typography
                sx={{
                    textOrientation: 'upright',
                    fontWeight: '400',
                    textAlign: 'center',
                    fontSize: '2rem',
                }}
            >
                Current
            </Typography>
            {currentGoals.length ? (
                <Grid
                    container
                    justifyContent='center'
                    spacing={3}
                >
                    {currentGoals.map(goal => (
                        <Grid
                            xs={12}
                            md={6}
                            lg={4}
                            key={goal?._id}
                            item
                        >
                            <GoalItem
                                key={goal._id}
                                goal={goal}
                                setChange={setChange}
                                style={{
                                    border: '2px solid lavender',
                                    borderRadius: '20px',
                                    backgroundColor: '#e6e6fa61'
                                }}/>
                        </Grid>))}
                </Grid>

            ) : (
                <Grid container direction='column' alignItems='center' sx={{
                    backgroundColor: 'lavender',
                    borderRadius: '20px',
                    padding: 10
                }}>

                    <img width='150'
                         src={FaceInClouds}
                         alt="Face in Clouds"/>
                    <Typography
                        color='lightsteelblue'
                        fontFamily='inherit'
                        variant={'h5'}
                    >No current Goals</Typography>
                </Grid>)}
            <Divider/>
            <Typography
                sx={{
                    textOrientation: 'upright',
                    fontWeight: '400',
                    textAlign: 'center',
                    fontSize: '2rem',
                }}
            >Finished</Typography>
            <Grid
                container
                justifyContent='center'
                spacing={3}
            >
                {finishedGoals.length ? finishedGoals.map((goal,) => (
                    <Grid
                        xs={12}
                        md={6}
                        lg={4}
                        key={goal?._id}
                        item
                    >
                        <GoalItem
                            key={goal._id}
                            goal={goal}
                            setChange={setChange}
                            style={{
                                border: '3px solid lavender',
                                borderRadius: '20px',
                                backgroundColor: '#e6e6fa61'
                            }}/>

                    </Grid>
                )) : (
                    <Grid container direction='column' alignItems='center' sx={{
                        // backgroundColor: 'lavender',
                        borderRadius: '20px',
                        padding: 10,
                        border: '4px dashed lavender'
                    }}>
                        <img width='150'
                             src={ConfusedFace}
                             alt="Confused Face"/>

                        <Typography
                            color='lightsteelblue'
                            fontFamily='inherit'
                            variant={'h5'}
                        >No Finished Goals</Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default Goals;