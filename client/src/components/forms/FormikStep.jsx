import React from 'react';
import {Grid} from "@mui/material";

function FormikStep({children}) {

    return <Grid container justifyContent='center'>
        {children}
    </Grid>;

}

export default FormikStep;