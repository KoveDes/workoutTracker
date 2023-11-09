import React, {useState} from 'react';
import {Box, Grid} from "@mui/material";
import CustomDialog from "../CustomDialog.jsx";
import Button from "@mui/material/Button";
import WeightGoalForm from "../../forms/WeightGoalForm.jsx";
import LoadGoalForm from "../../forms/LoadGoalForm.jsx";
import CountGoalForm from "../../forms/CountGoalForm.jsx";
import MeasurementGoalForm from "../../forms/MeasurementGoalForm.jsx";
import StyledButton from "../StyledButton.jsx";

function GoalsButtons({currentGoals, setChange}) {
    const [weightOpen, setWeightOpen] = useState(false);
    const [loadOpen, setLoadOpen] = useState(false);
    const [countOpen, setCountOpen] = useState(false);
    const [measurementOpen, setMeasurementOpen] = useState(false);
    return (
        <Box>
            <CustomDialog
                showButtons={true}
                width='xs'
                open={weightOpen} handleClose={() => setWeightOpen(false)} label={'Add goal'} formId={'weightGoalForm'}>
                <WeightGoalForm setChange={setChange}/>
            </CustomDialog>
            <CustomDialog
                showButtons={true}
                width='xs'
                open={loadOpen} handleClose={() => setLoadOpen(false)} label={'Add goal'} formId={'loadGoalForm'}>
                <LoadGoalForm setChange={setChange}/>
            </CustomDialog>
            <CustomDialog
                showButtons={true}
                open={countOpen} handleClose={() => setCountOpen(false)} label={'Add goal'} formId={'countGoalForm'}>
                <CountGoalForm setChange={setChange}/>
            </CustomDialog>
            <CustomDialog
                showButtons={true}
                width='xs'
                open={measurementOpen} handleClose={() => setMeasurementOpen(false)} label={'Add goal'}
                formId={'measurementGoalForm'}>
                <MeasurementGoalForm setChange={setChange}/>
            </CustomDialog>


            <Grid container justifyContent='center' gap={3}>
                {currentGoals === 4 ? <h3>You can have only 4 current goals</h3> : (<>
                    <StyledButton
                        onClick={() => setWeightOpen(true)}>
                        Add Weight Goal
                    </StyledButton>

                    <StyledButton
                        onClick={() => setLoadOpen(true)}>
                        Add Exercise Load Goal
                    </StyledButton>
                    <StyledButton
                        onClick={() => setCountOpen(true)}>
                        Add Workout Count Goal
                    </StyledButton>
                    <StyledButton
                        onClick={() => setMeasurementOpen(true)}>
                        Add Measurement Goal
                    </StyledButton>
                </>)}
            </Grid>
        </Box>
    );
}

export default GoalsButtons;