import {WorkoutRoutineCard} from "./WorkoutRoutineCard.jsx";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add.js";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import WorkoutRoutineForm from "../../forms/workoutRoutine/WorkoutRoutineForm.jsx";
import OptionsMenu from "../OptionsMenu.jsx";
import PlanForm from "../../forms/planForm.jsx";

function WorkoutPlanItem({workoutPlan, style, setChange}) {
    const plan = useDropdownMenu()
    const newRoutineMenu = useDropdownMenu();
    return (
        <Box style={style}
             component="main"
             sx={{
                 py: 3,
             }}
        >
            <Container maxWidth="xl" sx={{}}>
                <Stack sx={{position: 'relative'}}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        mb={4}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                {workoutPlan?.name}
                            </Typography>
                            <Typography variant="h6">
                                {workoutPlan?.description || ""}
                            </Typography>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >
                                <Button
                                    startIcon={(
                                        <AddIcon/>
                                    )}
                                    sx={{
                                        padding: '8px 20px',
                                        color: 'white',
                                        backgroundColor: 'rgb(99, 102, 241)',
                                        textTransform: 'none',
                                        borderRadius: '50px',
                                        '&:hover': {
                                            backgroundColor: 'rgb(67, 56, 202)'
                                        }
                                    }}
                                    onClick={newRoutineMenu.handleOpen}
                                >
                                    Add Routine
                                </Button>
                                <CustomDialog
                                    width='auto'
                                    open={newRoutineMenu.open}
                                    handleClose={newRoutineMenu.handleClose}
                                    label={'Workout routine'}
                                    formId='workoutRoutineForm'
                                    showButtons={false}
                                >
                                    <WorkoutRoutineForm setChange={setChange} planId={workoutPlan._id}/>
                                </CustomDialog>
                            </Stack>
                        </Stack>
                        <OptionsMenu
                            data={workoutPlan}
                            setChange={setChange}
                            apiPath='workoutPlan'
                            handleEdit={plan.handleOpen}
                            width='40px'
                        />
                        <CustomDialog
                            open={plan.open}
                            handleClose={plan.handleClose}
                            label='Workout Routine'
                            showButtons={true}
                            formId='planForm'
                            data={workoutPlan}
                        >
                            <PlanForm setChange={setChange}/>
                        </CustomDialog>
                    </Stack>
                    <Grid
                        container
                        justifyContent='center'
                        spacing={3}
                    >
                        {workoutPlan?.workoutRoutine.length > 0 ? workoutPlan?.workoutRoutine.map((workoutRoutine, index) => (
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                                key={workoutRoutine._id ? workoutRoutine._id : index}
                                item
                            >
                                <WorkoutRoutineCard planId={workoutPlan?._id} setChange={setChange}
                                                    workoutRoutine={workoutRoutine}/>
                            </Grid>
                        )) : (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Typography textAlign='center'>No Workout Routines</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
}

export default WorkoutPlanItem;