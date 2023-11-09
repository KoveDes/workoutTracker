import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {Alert, Grid, Snackbar, Tooltip} from "@mui/material";
import React, {forwardRef, useState} from "react";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";


const errorImg = {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Eye%20in%20Speech%20Bubble.png",
    alt: 'Hole'
}


const ExerciseItem = forwardRef(({exercise, custom, setChange, listeners, attributes, dragStyle}, ref) => {
    const [srcError, setSrcError] = useState(false);
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const handleDelete = async () => {
        try {
            await axiosPrivate.delete(`/customExercise?id=${exercise._id}&user=${auth.user}`);
            setChange(v => !v);
        } catch (e) {
           setError('Server error, try again later');
        }
    }
    return (
        <Card
            ref={ref}
            {...listeners}
            {...attributes}
            sx={{
                ...dragStyle,
                border: '2px solid #fbfbfb',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                borderRadius: '20px',
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                position: 'relative'
            }}>
            {custom ? (
                <Grid container justifyContent={'flex-end'}
                      sx={{position: 'absolute', bottom: 0, padding: '0 10px 5px'}}>
                    <Button onClick={handleDelete}>Delete</Button>
                </Grid>
            ) : null}

            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
            }}>
                {srcError ? <Typography fontWeight='bold' color={'red'}>Invalid image URL</Typography> : (
                    <Box
                        component="img"
                        alt={exercise.name}
                        onError={() => setSrcError(true)}
                        src={srcError ? errorImg.src : exercise.gifUrl}
                        sx={{
                            width: '100px',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>
            {error ? (
                <Snackbar
                    open={!!error}
                    severity='true'
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setError('')}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        {error}
                    </Alert>
                </Snackbar>
            ) : null}
            <Box p='0 10px 10px'
            >
                <Grid container gap={2} justifyContent='center'
                >
                    <InfoItem label={exercise.target}/>
                    <InfoItem label={exercise.equipment} bgColor='#3f3f3f'/>
                </Grid>
                <Tooltip title={exercise.name.length > 25 ? exercise.name : ''}>
                    <Typography
                        mt={2}
                        fontWeight='bold'
                        textAlign='center'
                        letterSpacing={-0.25}
                        // textTransform='uppercase'
                        fontSize='1rem'
                        color='#000000c2'
                    >{exercise.name.length > 25 ? `${exercise.name.slice(0, 26)}...` : exercise.name}</Typography>
                </Tooltip>
            </Box>
        </Card>
    );
});

export function InfoItem({label, bgColor}) {
    return (
        <Box sx={{
            backgroundColor: bgColor || '#df6565',
            borderRadius: '25px',
            p: '5px 10px',
            color: 'white',
        }}>
            <Tooltip title={label.length > 15 ? label : ''}>
                <Typography
                    letterSpacing={.5}
                    fontSize='0.75rem'
                >{label.length > 20 ? `${label.slice(0, 16)}...` : label}</Typography>
            </Tooltip>
        </Box>
    )
}

export default ExerciseItem