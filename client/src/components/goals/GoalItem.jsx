import React, {useState} from 'react';
import {Box, Card, CardContent, Divider, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomDialog from "../CustomDialog.jsx";
import WeightGoalForm from "../../forms/WeightGoalForm.jsx";
import MeasurementGoalForm from "../../forms/MeasurementGoalForm.jsx";
import LoadGoalForm from "../../forms/LoadGoalForm.jsx";
import CountGoalForm from "../../forms/CountGoalForm.jsx";
import {dateYearFormatter, niceParam} from "../../utils/formatters";
import OptionsMenu from "../OptionsMenu.jsx";


function getGoalValues(goal) {
    const goalMap = {
        weightUp: {
            name: 'Gain weight',
            adornment: 'kg',
        },
        weightDown: {
            name: 'Lose weight',
            adornment: 'kg',
        },
        workoutCount: {
            name: 'Perform workouts',
            adornment: 'workouts',
        },
        measurement: {
            name: `Set new ${ goal?.bodyParameter && niceParam(goal?.bodyParameter)} size`,
            adornment: 'cm',
        },
        load: {
            name: `Set new record in ${goal?.exercise}`,
            adornment: 'cm',
        },
    }
    return goalMap[goal?.category]

}

function GoalItem({goal = {}, setChange, style}) {
    const {name, adornment} = getGoalValues(goal);
    const [open, setOpen] = useState(false);
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                ...style,
            }}
        >
            <CardContent>
                <OptionsMenu
                    data={goal}
                    setChange={setChange}
                    apiPath='/goal'
                    showEdit={!goal?.finished}
                    handleEdit={() => setOpen(true)}
                />


                <CustomDialog
                    data={goal}
                    showButtons={true}
                    width='xs'
                    open={open} handleClose={() => setOpen(false)}
                    label={`Edit Goal | Current Value: ${goal?.currentValue}`}
                    formId={goal?.category.includes('weight') ? (
                        'weightGoalForm'
                    ) : goal?.category === 'measurement' ?
                        'measurementGoalForm' :
                        goal?.category === 'load' ? (
                            'loadGoalForm'
                        ) : (
                            'countGoalForm'
                        )
                    }>


                    {goal?.category.includes('weight') ? (
                        <WeightGoalForm setChange={setChange}/>
                    ) : goal?.category === 'measurement' ?
                        <MeasurementGoalForm setChange={setChange}/> :
                        goal?.category === 'load' ? (
                            <LoadGoalForm setChange={setChange}/>
                        ) : (
                            <CountGoalForm setChange={setChange}/>
                        )

                    }

                </CustomDialog>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    fontWeight={'bold'}
                    sx={{color: 'black'}}
                >
                    {name}
                </Typography>
                <Grid container justifyContent={'space-around'} mt={'10px'}>
                    {goal.finished ? null : (<Box>
                            <Typography variant='p' sx={{color: 'slategray'}}>Current Value</Typography>
                            <Typography variant='h6' textAlign={"center"}>{goal.currentValue} {adornment}</Typography>

                        </Box>
                    )}
                    <Box>
                        <Typography variant='p' textAlign='center' sx={{color: 'slategray'}}>End Value</Typography>
                        <Typography variant='h6' textAlign='center'>
                            {goal.endValue} {adornment}
                        </Typography>
                    </Box>
                </Grid>
            </CardContent>
            <Divider sx={{borderColor: 'rgb(242, 244, 247)'}}/>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{p: 2}}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body2"
                    >
                        Start Date: {dateYearFormatter(goal.startedAt)}
                    </Typography>
                </Stack>
                {goal?.finished ? (
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Typography
                            color="text.secondary"
                            display="inline"
                            variant="body2"
                        >
                            Finish date: {dateYearFormatter(goal?.startedAt)}
                        </Typography>
                    </Stack>
                ) : null}
            </Stack>
        </Card>
    );
}

export default GoalItem;