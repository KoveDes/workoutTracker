import React, {useState} from 'react';
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import Card from "@mui/material/Card";
import {Grid, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomDialog from "../CustomDialog.jsx";
import StretchExerciseDetails from "./StretchExerciseDetails.jsx";

const errorImg = {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Eye%20in%20Speech%20Bubble.png",
    alt: 'Hole'
}


function StretchExercise({exercise}) {
    const [showHelper, setShowHelper] = useState(false);
    const [srcError, setSrcError] = useState(false);
    const details = useDropdownMenu();
    return (
        <Card

            sx={{
                border: '2px solid #fbfbfb',
                // backgroundColor: 'lightsalmon',
                // height: '270px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                borderRadius: '20px',
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                position: 'relative'
            }}
            onMouseOver={() => setShowHelper(true)}
            onMouseLeave={() => setShowHelper(false)}


        >
            {showHelper &&(
            <Box
                component='img'
                src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png'
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    opacity: 1,
                    zIndex: '2',
                    cursor: 'pointer'
                }}
                onClick={details.handleOpen}
            />
            )}
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
                        src={!srcError && `../${exercise.gifUrl}`}
                        sx={{
                            width: '100px',
                            // height: '%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>
            <Box p='0 10px 10px'>
                <Grid container gap={2} justifyContent='center'
                >
                    <InfoItem label={`For ${exercise.target}`}/>
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

            <CustomDialog
                open={details.open}
                handleClose={() => {
                    details.handleClose()
                    setShowHelper(false)
                }}
                isForm={false}
                label={exercise.name}

            >
                <StretchExerciseDetails exercise={exercise}/>
            </CustomDialog>
        </Card>
    )}


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


export default StretchExercise;