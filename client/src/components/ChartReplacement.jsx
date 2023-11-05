import React from 'react';
import {Grid, Typography} from "@mui/material";

function ChartReplacement({text='Add more data'}) {
    return (
        <Grid container justifyContent='center' alignItems='center'
              direction='column' sx={{
            height: '100%',
            margin: '25px 0 0',
            backgroundColor: 'antiquewhite',

        }}>
            <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png"
                alt="Bar Chart" width="20%"/>
            <Typography color='burlywood' fontWeight='500' variant='h5'>{text}</Typography>
        </Grid>
    );
}

export default ChartReplacement;