import React from 'react';
import {Grid, Typography} from "@mui/material";

function ChartReplacement({text='Add more data'}) {
    return (
        <Grid container justifyContent='center' alignItems='center'
              direction='column' sx={{
            height: '100%',
            backgroundColor: '#c0c0e5',

        }}>
            <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png"
                alt="Bar Chart" width="20%"/>
            <Typography color='#3b3b3f' fontWeight='500' variant='h5'>{text}</Typography>
        </Grid>
    );
}

export default ChartReplacement;