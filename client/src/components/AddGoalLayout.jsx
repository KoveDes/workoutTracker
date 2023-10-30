import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import WeightGoalForm from "../forms/WeightGoalForm.jsx";
import MeasurementGoalForm from "../forms/MeasurementGoalForm.jsx";
import CountGoalForm from "../forms/CountGoalForm.jsx";
import LoadGoalForm from "../forms/LoadGoalForm.jsx";

function AddGoalLayout({setFormId}) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Weight"  onClick={() => {setFormId('weightGoalForm')}}/>
                <Tab label="Exercise Load" onClick={() => {setFormId('loadGoalForm')}} />
                <Tab label="Count workouts" onClick={() => {setFormId('countGoalForm')}} />
                <Tab label="Measurement"  onClick={() => {setFormId('measurementGoalForm')}}/>
            </Tabs>
            <Box>
                {value === 0 ? <WeightGoalForm/> : null}
                {value === 1 ? <LoadGoalForm/> : null}
                {value === 2 ? <CountGoalForm/> : null}
                {value === 3 ? <MeasurementGoalForm/> : null}
            </Box>
        </Box>
    );
}

export default AddGoalLayout;