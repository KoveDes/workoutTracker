import React from 'react';
import {Box, Chip, Grid, Slider, Typography} from "@mui/material";
import CustomInput from "../CustomInputs.jsx";
import {useField} from "formik";
import InfoIcon from "@mui/icons-material/Info.js";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import CustomDialog from "../CustomDialog.jsx";
import ExerciseVideos from "./ExerciseVideos.jsx";
import RPEInfo from "./RPEInfo.jsx";
import RPESuggestion from "./RPESuggestion.jsx";

const colors = ['#5995ff','#42dfde','#42dfde', '#4ce43f', '#4ce43f', '#4ce43f', '#f6c647', '#f6c647', '#f38332', '#ed4122'];


function Set({previousValues, id, index, setsCount}) {


    return (
        <Grid
            key={id}
            container
            direction='column'
        >
            {JSON.stringify(previousValues)}
            <Typography variant='h4' fontWeight='bold' color='#6495ed' mb={'10px'}>
                Set {index + 1} of {setsCount}
            </Typography>
            <Typography
                variant='h6'
            >
               Reps
            </Typography>
            <CustomInput
                type='number'
                width='100px'
                variant='standard'
                name={`sets.${index}.reps`}
            />
            <Grid>
            <CustomInput
                label='Load'
                adornment='kg'
                type='number'
                width= '150px'
                name={`sets.${index}.load`}
            />
                {previousValues?.rpe &&<RPESuggestion rpe={previousValues?.rpe}/>}
                {/*<RPESuggestion rpe={7}/>*/}

            </Grid>
            <RPESlider
                label='RPE'
                name={`sets.${index}.rpe`}

            />
        </Grid>
    );
}



function RPESlider({label, ...props}) {
    const [field, meta, helpers] = useField(props);
    const id = props.name;
    const scaleColor = colors[field.value - 1];
    const showTable = useDropdownMenu();
    return (
        <Grid container direction='column'>
            <Grid container alignItems='center'>
                <label htmlFor={field.name}>{label}</label>

            </Grid>
            <Typography component='p'
                        sx={{
                            textAlign: 'left',
                            // backgroundColor: 'forestgreen',
                            // color: 'white',
                            // p: ' 2px 15px',
                            // borderRadius: '15px',
                            // m: '10px 0'
                        }}
                        fontWeight='bold'>{field?.value || 0}</Typography>

            <Slider
                sx={{
                    width: '75%',
                    color: scaleColor,
                    '.MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
                        borderRadius: '15px',
                    },
                    ".MuiSlider-valueLabel:before": {
                        width: 0,
                    }
                }}
                step={1}
                marks
                min={1}
                max={10}
                defaultValue={field.value}
                {...field} {...props}
            />
            <Grid container>
                <Typography
                    onClick={showTable.handleOpen}
                    variant='overline'
                    fontWeight='bold'
                    sx={{
                        color: 'darkgray',
                        cursor: 'pointer'
                    }}
                >What is RPE?</Typography>
                <CustomDialog
                    // width={'lg'}
                    label='RPE Scale'
                    isForm={false}
                    showButtons={false}
                    open={showTable.open}
                    handleClose={showTable.handleClose}>
                    <RPEInfo />

                </CustomDialog>
            </Grid>
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </Grid>
    );
}


export default Set;