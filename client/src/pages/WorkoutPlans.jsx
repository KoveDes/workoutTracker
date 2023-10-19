import React, {useEffect, useState} from 'react';
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import WorkoutPlanItem from "../components/WorkoutPlanItem.jsx";
import WorkoutPlanControls from "../components/WorkoutPlanControls.jsx";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import {useField} from "formik";


function WorkoutPlans(props) {
    const [change,setChange] = useState(false);
    const [workoutPlans,setWorkoutPlans] = useState([]);
    const mainWorkoutPlan = workoutPlans ? workoutPlans?.find(plan => {
        return plan.main === true;
    }) : null;
    const otherWorkoutPlans = workoutPlans ? workoutPlans?.filter(plan => plan.main === false).reverse() : [];
    // const mainWorkoutPlan = {}
    // const otherWorkoutPlans = [{},{}];
    console.log(mainWorkoutPlan)
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`workoutPlan/all?user=${auth.user}`, {
                    signal: controller.signal
                })
                if(!ignore) {
                    setWorkoutPlans(response.data);
                }
            }
            catch (e) {
                console.log(e);
                setWorkoutPlans([]);
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    },[change])
    return (


        <Container maxWidth='xl'>
            <Grid container direction='column' my={4} gap={3}>
                <WorkoutPlanControls setChange={setChange}/>
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
                    >Main Plan</Typography>
                    {mainWorkoutPlan ? (<WorkoutPlanItem
                        workoutPlan={mainWorkoutPlan}
                        setChange={setChange}
                        style={{
                            backgroundColor: 'lavender',
                            borderRadius: '20px',
                            // border: '2px solid grey',
                            // boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                            // boxShadow: "rgb(33 8 8 / 44%) 0px 5px 12px, rgba(0, 0, 0, 0.03) 10px 10px 10px 5px",
                        }}/>) : (
                        <Grid container direction='column' alignItems='center'>
                            <img width='150' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20in%20Clouds.png" alt="Face in Clouds" />
                            <h1>Select Main Workout Plan</h1>
                        </Grid>)}
                </Box>
                <Divider/>
                <Typography
                    sx={{
                        textOrientation: 'upright',
                        fontWeight: '400',
                        textAlign: 'right',
                        fontSize: '2rem',
                    }}
                >Other plans</Typography>
                {otherWorkoutPlans.length ? otherWorkoutPlans.map((plan, index) => (
                    <WorkoutPlanItem  key={plan._id} setChange={setChange} workoutPlan={plan} style={{
                        backgroundColor: 'lavender',
                        borderRadius: '20px',
                        // border: '2px solid grey',
                        boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",

                        // boxShadow: "rgb(33 8 8 / 44%) 0px 5px 12px, rgba(0, 0, 0, 0.03) 10px 10px 10px 5px",
                    }}/>
                )) : (
                    <Grid container direction='column' alignItems='center'>
                        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Confused%20Face.png" alt="Confused Face" width='100' />
                        {/*<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20in%20Clouds.png" alt="Face in Clouds" />*/}
                        <h1>No Workout Plans</h1>
                    </Grid>
                )}

            </Grid>

        </Container>
    );
}

export default WorkoutPlans;