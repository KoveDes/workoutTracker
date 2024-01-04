import React, {useState} from "react";
import {Form, Formik} from "formik";
import {CircularProgress, Grid, Step, StepLabel, Stepper} from "@mui/material";
import StyledButton from "../StyledButton.jsx";

export default function FormikStepper({children, submittingText, submitText, exercises, ...props}) {
    const childrenArr = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const currentChild = childrenArr[step];
    const isLastStep = step === childrenArr.length - 1;


    return (<Formik {...props}
                    validationSchema={currentChild.props?.validationSchema}
                    onSubmit={async (values, actions) => {
                        if (isLastStep) {
                            await props.onSubmit(values, actions);
                            setCompleted(true);

                        } else {
                            await actions.setTouched({}, false)
                            setStep(s => s + 1);
                        }
                    }}
    >
        {(props) => (<Form style={{maxWidth: 'initial'}}>
            <Stepper alternativeLabel activeStep={step}>
                {childrenArr.map((child, index) => (
                    <Step key={child?.props.label} completed={step > index || completed}>
                        <StepLabel>{child?.props.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/*{JSON.stringify(props.errors.exercises)}*/}
            {React.cloneElement(currentChild, {formValues: props.values})}

            <Grid container paddingTop={2} gap={2} justifyContent='center'>

                {step > 0 ?
                    <StyledButton
                        disabled={props.isSubmitting}
                        onClick={() => setStep(s => s - 1)}>Back</StyledButton>
                    : null}
                <StyledButton
                    startIcon={props.isSubmitting ? <CircularProgress size='1rem'/> : null}
                    disabled={props.isSubmitting}
                    type='submit'>{props.isSubmitting ? submittingText : isLastStep ? submitText : 'Next'}</StyledButton>
            </Grid>
        </Form>)}
    </Formik>)
}