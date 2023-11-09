import React, {useEffect} from 'react';
import {formatTime} from "../../utils/formatters.js";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function Timer({restTime, setShowTimer, setCurrentSet}) {
    const [seconds, setSeconds] = React.useState(restTime)
    const [running, setRunning] = React.useState(true)
    const ref = React.useRef(null);


    useEffect(() => {
        if (running) {
            ref.current = window.setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        }
        if (seconds === 0) {
            window.clearInterval(ref.current)
            setShowTimer(false);
        }
        return () => window.clearInterval(ref.current);
    })

    const handleClick = () => {
        setRunning(v => !v);
    }
    const handleSkipClick = () => {
        setRunning(false);
        window.clearInterval(ref.current);
        setSeconds(0);
        setShowTimer();
        setCurrentSet && setCurrentSet();
    }

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '50px',
            }}>
            <Typography variant='h3' textAlign='center' mb={3} color='#6495ed'>Rest Time</Typography>
            <Typography variant='h4' fontFamily='inherit' textAlign='center'>{formatTime(seconds)}</Typography>
            <Stack direction='row' gap={1} mt='10px' justifyContent='center'>
                <IconButton
                    variant='outlined'
                    onClick={handleClick}>
                    {running === true ? <PauseIcon/> : <PlayArrowIcon/>}
                </IconButton>
                <IconButton
                    variant='outlined'
                    onClick={handleSkipClick}><SkipNextIcon/></IconButton>
            </Stack>
        </Box>
    )
}


export default Timer;