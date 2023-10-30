import React, {useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    Divider,
    IconButton,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {default as ClockIcon} from "@mui/material/SvgIcon/SvgIcon.js";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import CustomDialog from "../CustomDialog.jsx";
import WeightGoalForm from "../../forms/WeightGoalForm.jsx";
import MeasurementGoalForm from "../../forms/MeasurementGoalForm.jsx";
import LoadGoalForm from "../../forms/LoadGoalForm.jsx";
import CountGoalForm from "../../forms/CountGoalForm.jsx";

function GoalItem({goal, setChange}) {
    const adornment = (goal.category.includes('weight') || goal.category === 'load') ? 'kg' : goal.category === 'workoutCount' ? 'workouts' : 'cm'
    const name = goal?.category === 'weightUp' ? 'Gain Weight' : goal.category === 'weightDown' ? 'Lose weight' :
        goal.category === 'workoutCount' ? 'Perform workouts' : goal.category === 'measurement' ? `Set new ${goal?.bodyParameter} size` : `Set new record in ${goal?.exercise}`

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const [open, setOpen] = useState(false);


    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(`/goal?id=${goal._id}&user=${auth.user}`)
            setChange(v => !v);
        } catch (e) {
            alert('Error');
        }
    }
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}
        >
            <CardContent>
                <Box sx={{
                    position: 'absolute',
                    right: '0',
                }}>
                    {goal?.finished ? null : (
                        <IconButton onClick={() => setOpen(true)}>
                            <EditIcon/>
                        </IconButton>
                    )}
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
                <CustomDialog data={goal}
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 1,
                    }}
                >
                    {/*<Avatar*/}
                    {/*    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Flexed%20Biceps%20Light%20Skin%20Tone.png"*/}
                    {/*    variant="square"*/}
                    {/*/>*/}
                </Box>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    fontWeight={'bold'}
                >
                    {name}
                </Typography>
                <Divider sx={{borderColor: 'rgb(242, 244, 247)'}}/>
                <Grid container justifyContent={'space-around'} mt={'10px'}>
                    {goal.finished ? null : (<Box>
                            <Typography variant='p'>Current Value</Typography>
                            <Typography variant='h6' textAlign={"center"}>{goal.currentValue} {adornment}</Typography>

                        </Box>
                    )}
                    <Box>
                        <Typography variant='p' textAlign='center'>End Value</Typography>
                        <Typography variant='h6' textAlign='center'>
                            {goal.endValue} {adornment}
                        </Typography>

                    </Box>
                </Grid>
            </CardContent>
            <Box sx={{flexGrow: 1}}/>
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
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <ClockIcon/>
                    </SvgIcon>
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body2"
                    >
                        {/*{workoutRoutine.days}*/}
                        Start Date: {goal.startedAt}
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
                            Finish date: {goal?.startedAt}
                            {/*{company.downloads} Finished*/}
                        </Typography>
                    </Stack>
                ) : null}
            </Stack>
        </Card>
    );
}

export default GoalItem;