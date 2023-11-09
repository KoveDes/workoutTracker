import React, {useState} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import WorkoutPlanItem from "../components/workoutPlans/WorkoutPlanItem.jsx";
import useFetch from "../hooks/useFetch.js";
import FaceInClouds from '../assets/Face in Clouds.png';
import ConfusedFace from '../assets/Confused Face.png';
import Button from "@mui/material/Button";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import CustomDialog from "../components/CustomDialog.jsx";
import PlanForm from "../forms/planForm.jsx";


function WorkoutPlans() {
    const [change, setChange] = useState(false);
    const newPlan = useDropdownMenu();
    const {response: workoutPlans} = useFetch(({
        method: 'get',
        path: 'workoutPlan/all',
        deps: [change],
    }))
    const mainWorkoutPlan = workoutPlans ? workoutPlans?.find(plan => {
        return plan.main === true;
    }) : null;
    const otherWorkoutPlans = workoutPlans ? workoutPlans?.filter(plan => plan.main === false).reverse() : [];

    return (
        <Container maxWidth='xl'>
            <Grid container direction='column' gap={3}>
                <Grid container justifyContent='center'>
                    <Button onClick={newPlan.handleOpen}
                            variant='outlined'
                            sx={{
                                border: 'none',
                                color: 'white',
                                backgroundColor: '#3b3b3f',
                                "&:hover": {
                                    backgroundColor: '#3b4973',
                                    border: 'none',
                                }
                            }}>Add new Plan</Button>
                    <CustomDialog
                        open={newPlan.open}
                        handleClose={newPlan.handleClose}
                        label='Workout Plan'
                        showButtons={true}
                        formId='planForm'
                    >
                        <PlanForm setChange={setChange}/>
                    </CustomDialog>
                </Grid>
                <Grid container direction='column'
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '2rem',
                            mb: '10px',

                        }}
                    >Main plan</Typography>
                    {mainWorkoutPlan ? (<WorkoutPlanItem
                        workoutPlan={mainWorkoutPlan}
                        setChange={setChange}
                        style={{
                            backgroundColor: 'lavender',
                            borderRadius: '20px',
                        }}/>) : (
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
                            >Select Main Workout Plan</Typography>
                        </Grid>)}
                </Grid>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        textAlign: 'center',
                        mb: '10px'
                    }}
                >Other plans</Typography>
                {otherWorkoutPlans.length ? otherWorkoutPlans.map((plan) => (
                    <WorkoutPlanItem key={plan._id} setChange={setChange} workoutPlan={plan} style={{
                        backgroundColor: 'lavender',
                        borderRadius: '20px',
                        boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                    }}/>
                )) : (
                    <Grid container direction='column' alignItems='center' sx={{
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
                        >No Workout Plan</Typography>
                    </Grid>
                )}

            </Grid>

        </Container>
    );
}

export default WorkoutPlans;