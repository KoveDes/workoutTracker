import React, {useEffect, useState} from 'react';
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import GoalsButtons from "../components/goals/GoalsButtons.jsx";
import GoalItem from "../components/goals/GoalItem.jsx";

function Goals(props) {
    const [change, setChange] = useState();
    const [goals, setGoals] = useState([]);
    const finishedGoals = goals ? goals.filter(goal => goal.finished === true) : [];
    const currentGoals = goals ? goals.filter(goal => goal.finished === false) : [];

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`goal/all?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setGoals(response.data);
                }
            } catch (e) {
                console.log(e);
                setGoals([]);
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [change])


    return (
        <Container maxWidth='xl'>
            <Grid container direction='column' my={4} gap={3}>
                <GoalsButtons currentGoals={currentGoals.length} setChange={setChange}/>
                {/*<WorkoutPlanControls setChange={setChange}/>*/}
                <Box
                >
                    <Divider/>

                    <Typography
                        sx={{
                            textOrientation: 'upright',
                            fontWeight: '400',
                            textAlign: 'right',
                            fontSize: '2rem',
                        }}
                    >
                        Current
                    </Typography>
                    <Grid
                        container
                        justifyContent='center'
                        spacing={3}
                    >
                        {currentGoals.length ? currentGoals.map(goal => (
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
                                        backgroundColor: 'lavender',
                                        borderRadius: '20px',
                                        // border: '2px solid grey',
                                        // boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                                        // boxShadow: "rgb(33 8 8 / 44%) 0px 5px 12px, rgba(0, 0, 0, 0.03) 10px 10px 10px 5px",
                                    }}/>
                            </Grid>
                        )) : (
                            <Grid container direction='column' alignItems='center' sx={{
                                backgroundColor: 'lavender',
                                borderRadius: '20px',
                                padding: 10
                            }}>

                                <img width='150'
                                     src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20in%20Clouds.png"
                                     alt="Face in Clouds"/>
                                <Typography
                                    color='lightsteelblue'
                                    fontFamily='inherit'
                                    variant={'h5'}
                                >No Goals</Typography>
                            </Grid>)}
                    </Grid>
                </Box>
                <Divider/>
                <Typography
                    sx={{
                        textOrientation: 'upright',
                        fontWeight: '400',
                        textAlign: 'right',
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
                               />
                        </Grid>
                    )) : (
                        <Grid container direction='column' alignItems='center' sx={{
                            // backgroundColor: 'lavender',
                            borderRadius: '20px',
                            padding: 10,
                            border: '4px dashed lavender'
                        }}>
                            <img width='150'
                                 src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Confused%20Face.png"
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

        </Container>
    );
}

export default Goals;