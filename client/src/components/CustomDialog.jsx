import React from 'react';
import useFormState from "../hooks/useFormState.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Divider, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ErrorImg from '../assets/Error.png'
import SuccessImg from '../assets/Success.png'
import StyledButton from "./StyledButton.jsx";

function CustomDialog({
                          open,
                          handleClose: x,
                          isForm = true,
                          label,
                          data,
                          children,
                          width,
                          formId,
                          showButtons = false
                      }) {
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
    const passedForm = isForm ? React.cloneElement(children, {
        data,
        success,
        setSuccess,
        setError,
        setIsSubmitting,
    }) : children;

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
                {success ? (
                    <Grid container direction='column' alignItems='center'>
                        <img
                            style={{width: '30%'}}
                            src={SuccessImg}
                            alt="Success icon"/>
                        <Typography variant='h5'>{success}</Typography>
                    </Grid>) : null}
                {error ? (<Grid container direction='column' alignItems='center'>
                    <img
                    style={{width: '15%'}}
                    src={ErrorImg}
                    alt="Error icon"/>
                    <p>{error}</p></Grid>) : null}
                {!success ? passedForm : null}
            </DialogContent>
            {showButtons && !success ? (
                <DialogActions>
                    <StyledButton onClick={handleClose}>Cancel</StyledButton>
                    <StyledButton form={formId} type='submit'
                            disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving" : "Save"}
                    </StyledButton>
                </DialogActions>
            ) : null}
        </Dialog>
    );
}


export default CustomDialog;