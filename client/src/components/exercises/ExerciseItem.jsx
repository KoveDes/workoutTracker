import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {Grid, Tooltip} from "@mui/material";
import React, {forwardRef, useState} from "react";
import Button from "@mui/material/Button";
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";


const errorImg = {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Eye%20in%20Speech%20Bubble.png",
    alt: 'Hole'
}


// export default function ExerciseItem({exercise, custom, setChange}) {
const ExerciseItem = forwardRef(({exercise, custom, setChange, listeners, attributes, dragStyle}, ref) => {
    const [srcError, setSrcError] = useState(false);
    const {open, handleClose, handleOpen} = useDropdownMenu();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(`/customExercise?id=${exercise._id}&user=${auth.user}`)
            setChange(v => !v);
        } catch (e) {
            alert('Error');
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
                // backgroundColor: 'lightsalmon',
                // height: '270px',
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
                            // height: '%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>
            <Box p='0 10px 10px'
            >
                <Grid container gap={2} justifyContent='center'
                >
                    <InfoItem label={exercise.target}/>
                    <InfoItem label={exercise.equipment} bgColor='#3f3f3f'/>
                    {/*<Typography>{exercise.equipment}</Typography>*/}
                    {/*<Typography>{exercise.target}</Typography>*/}
                    {/*    /!*<ColorPreview colors={product.colors} />*!/*/}
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
                    // fontWeight='500'
                    letterSpacing={.5}
                    fontSize='0.75rem'
                >{label.length > 20 ? `${label.slice(0, 16)}...` : label}</Typography>
            </Tooltip>
        </Box>
    )
}

export default ExerciseItem