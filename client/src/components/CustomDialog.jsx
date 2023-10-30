import React from 'react';
import useFormState from "../hooks/useFormState.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Divider, Unstable_Grid2 as Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CustomExerciseForm from "../forms/CustomExerciseForm.jsx";

function CustomDialog({open, handleClose: x, label, data, children, width, formId, showButtons=false}) {
    const {
        success,
        error,
        isSubmitting,
        setSuccess,
        setError,
        setIsSubmitting
    } = useFormState();

    const handleClose = () => {
        setError('');
        setSuccess('');
        x();
    }
    // const formChildren = Array.isArray(children) ? children[0] : children;

    const passedForm = React.cloneElement(children, {
        data,
        success,
        setSuccess,
        setError,
        setIsSubmitting,
    })

    return (
        <Dialog
            fullWidth={!!width}
            maxWidth={width}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="change-pwd">
                <Grid container mt={0} gap={0.5} alignItems={'center'}>
                    <Grid item={'true'}>
                        {label}
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider/>

            <DialogContent>
                {success ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                    style={{width: '15%'}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands%20Light%20Skin%20Tone.png"
                    alt="Clapping Hands Light Skin Tone"/>
                    <p>{success}</p></div>) : null}
                {error ? (<div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}><img
                    style={{width: '15%'}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/No%20Entry.png"
                    alt="No Entry"/>
                    <p>{error}</p></div>) : null}
                {passedForm}
            </DialogContent>
            {showButtons ? (
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button form={formId} type='submit'
                        disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving" : "Save"}
                </Button>
            </DialogActions>
            ) : null}
        </Dialog>
    );
}


export default CustomDialog;