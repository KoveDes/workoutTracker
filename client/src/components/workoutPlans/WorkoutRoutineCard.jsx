import {Avatar, Box, Card, CardContent, Chip, Divider, Grid, Stack, SvgIcon, Typography} from '@mui/material';
import {default as ClockIcon} from '@mui/icons-material/WatchLater';
import {toDaysNamesFormatter} from "../../utils/formatters.js";
import OptionsMenu from "../OptionsMenu.jsx";
import {Link} from "react-router-dom";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import WorkoutRoutineForm from "../../forms/workoutRoutine/WorkoutRoutineForm.jsx";
import LeftHand from '../../assets/LeftHand.png';
import RightHand from '../../assets/RightHand.png';
import DefaultIcon from '../../assets/DefaultRoutineIcon.png';
import StyledButton from "../StyledButton.jsx";

export const WorkoutRoutineCard = ({workoutRoutine, setChange, planId}) => {
    const days = workoutRoutine?.days ? toDaysNamesFormatter(workoutRoutine.days) : null;
    const shouldPerformToday = workoutRoutine?.days?.some(day => day === new Date().getDay());
    const editRoutine = useDropdownMenu();
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: '30%, 30%',
                backgroundPosition: '110%, -10%',
                backgroundImage: shouldPerformToday && `url(${LeftHand}), url(${RightHand})`
            }}
        >
            <CardContent sx={{position: 'relative'}}>
                <OptionsMenu
                    data={workoutRoutine}
                    setChange={setChange}
                    apiPath='workoutPlan/routine'
                    parentId={planId}
                    isRoutine={true}
                    handleEdit={editRoutine.handleOpen}
                    sharable={true}
                />

                {shouldPerformToday  ? (
                    <Typography
                        variant='subtitle1'
                        fontWeight='bolder'
                        sx={{
                            position: 'absolute',
                            color: 'orangered',
                    }}>
                        Perform today
                    </Typography>
                    ) : null }

                <CustomDialog
                    width='auto'
                    open={editRoutine.open}
                    handleClose={editRoutine.handleClose}
                    label={'Workout routine'}
                    formId='workoutRoutineForm'
                    showButtons={false}
                >
                    <WorkoutRoutineForm setChange={setChange} planId={planId} routine={workoutRoutine}/>
                </CustomDialog>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 1,
                    }}
                >
                    <Avatar
                        alt='icon'
                        src={workoutRoutine?.icon || DefaultIcon}
                        variant="square"
                    />
                </Box>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                >
                    {workoutRoutine?.name}
                </Typography>
                <Typography
                    align="center"
                    variant="body1"
                    sx={{minHeight: '25px'}}
                >
                    {workoutRoutine?.note}
                </Typography>
                <Grid container justifyContent='center'>
                    <StyledButton
                        component={Link}
                        to='/workout'
                        state={{workoutRoutine, planId}}
                    >Start</StyledButton>

                </Grid>

            </CardContent>
            <Divider sx={{borderColor: 'rgb(242, 244, 247)'}}/>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
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
                    {workoutRoutine.days ? days.map((day, index) => (
                        <Chip
                            label={day}
                            key={day}
                            sx={{
                                mr: '5px',
                                backgroundColor: (workoutRoutine.days[index] === new Date().getDay()) ? 'orangered' : 'rgba(0, 0, 0, 0.08)',
                            }}/>
                    )) : null}
                </Stack>
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
                        Performed: {workoutRoutine?.performed || 0}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
};
