import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

function RecordItem({value, name}) {
    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                justifyContent='space-between'
                alignItems='flex-start'
                gap={3}
            >
                <Typography variant='body1' fontWeight='500'>
                    {name}
                </Typography>
                <Typography variant='h6' sx={{color: 'gold'}}>
                    {value}
                </Typography>
            </Grid>
        </Box>
    );
}

export default RecordItem;