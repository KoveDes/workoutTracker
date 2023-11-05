import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import weightGoalSchema from "../schemas/weightGoalSchema.js";
import {Box, IconButton, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomInput2} from "./CustomInputs.jsx";
import entryAddSchema, {bodyParamSchema} from "../schemas/entryAddSchema.js";
import weightSchema from "../schemas/entryAddSchema.js";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import heightSchema from "../schemas/heightSchema.js";
import GoalFinished from "./GoalFinished.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";

function EntryComposer({setRefresh,data, apiPath, payloadParam, setChange, adornment, buttonText, method='post'}) {
    const axiosPrivate = useAxiosPrivate();
    const openGoal = useDropdownMenu();

    const [showGoal, setShowGoal] = useState(null);
    const handleSubmit = async (values, helpers) => {
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate[method](apiPath,
                JSON.stringify({
                    [payloadParam]:values[payloadParam],
                }),
                {signal: controller.signal})
            if(response?.data?.goalMessage){
                setShowGoal(response?.data?.goalMessage)
            }
            console.log(response?.data)
        } catch (e) {
            console.log(e);
        }
        if (setRefresh) setRefresh(v => !v);
        setChange(v => !v);

    }

    return (<>
        <Formik
            enableReinitialize={true}
            initialValues={{
                [payloadParam]: data ? data : 0,
            }}
            validationSchema={payloadParam === 'weight' ?  weightSchema:
                payloadParam === 'height' ? heightSchema :bodyParamSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='entryForm' style={{margin: 0}}>
                        <Grid container direction='row' gap={1}>
                            <Box sx={{width:'35%'}}>
                                <CustomInput2
                                    name={payloadParam}
                                    type='number'
                                    adornment={adornment}
                                />
                            </Box>

                            <Button

                                size='small' type='submit' variant='outlined' disabled={props.isSubmitting}>
                                {/*{`Set ${buttonText}`}*/}
                                {props.isSubmitting ? `Setting new ${buttonText}...` : `Set ${buttonText}`}
                            </Button>
                        </Grid>

                </Form>
            )}
        </Formik>
            {showGoal && (
                <GoalFinished
                    message={showGoal?.message}
                    goal={showGoal.goal}
                />
            )}
        </>
    );
}

export default EntryComposer;