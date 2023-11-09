import {Box, Grid, SvgIcon, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom";
import EyeImg from '../assets/Eye.png'

function Missing() {

    return (
        <Grid container direction='column' alignItems='center'>
                <Box
                    component='img'
                    src={EyeImg}
                />
            <Typography variant='h2' fontWeight='bold' sx={{color: 'orangered'}}>404: Missing page</Typography>
            <Button
                component={Link}
                to='/'
                startIcon={
                    <SvgIcon fontSize="small">
                        <ArrowBackIcon />
                    </SvgIcon>
                }
                sx={{
                    mt: 3,
                    color: '#3b3b3f',
                    fontWeight: 'bold',
                    p: '10px',
            }}
            >Go to the main page</Button>

        </Grid>
    );
}


export default Missing;