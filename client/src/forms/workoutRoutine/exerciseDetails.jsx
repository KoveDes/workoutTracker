import React from 'react';
import {FieldArray} from "formik";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import {CustomSlider, CustomSwitch} from "../../components/CustomInputs.jsx";
import {formatSeconds} from "../../utils/formatters.js";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever.js";

function ExerciseDetails({formValues}) {
    return (
        <FieldArray name={'exercises'}>
            {({insert, remove, push}) => (
                <Grid container direction='column' gap='30px' mt='30px'>
                    {formValues.exercises.length > 0 &&
                        formValues.exercises.map((exercise, index) => (
                            <Accordion key={index} sx={{
                                // border: '2px dashed cornflowerblue',
                                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                                border: '2px solid #45a0fd8c'
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Grid container alignItems='center' gap='20px'>
                                        <Box sx={{height: '60px', width: '60px',}}>
                                            <Box component='img'
                                                 src={exercise.exercise.gifUrl || 'Img'}
                                                 sx={{objectFit: 'cover', width: '100%'}}></Box>
                                        </Box>
                                        <Typography
                                            fontWeight='500'>{exercise.exercise?.name }</Typography>

                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <CustomSlider
                                            formater={formatSeconds}
                                            displayLabel='off'
                                            label='Rest time'
                                            name={`exercises.${index}.restTime`}
                                        />

                                    </Box>
                                    <FieldArray name={`exercises.${index}.sets`}>
                                        {({remove, push}) => (
                                            <Box mt={'15px'}>
                                                <Button
                                                    variant='outlined'
                                                    sx={{ mb: '15px'}}
                                                    onClick={() => push({
                                                        reps: 0,
                                                        duration: 0,
                                                        showDuration: false
                                                    })}
                                                >
                                                    Add Set
                                                </Button>

                                                <Grid container direction='column' gap={3}>
                                                    {formValues.exercises[index].sets?.length > 0 &&
                                                        formValues.exercises[index].sets.map((set, setIndex) => (


                                                            <Accordion
                                                                key={setIndex}
                                                                sx={{
                                                                    p: '0 20px',
                                                                    border: '2px dashed cornflowerblue',
                                                                    boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",

                                                                }}>
                                                                <AccordionSummary sx={{}}
                                                                                  expandIcon={
                                                                                      <ExpandMoreIcon/>}>
                                                                    <Grid container alignItems='center'>
                                                                        <IconButton
                                                                            onClick={() => {
                                                                                remove(setIndex)

                                                                            }}
                                                                        >
                                                                            <DeleteForeverIcon sx={{
                                                                                color: 'rgba(0, 0, 0, 0.87)',
                                                                                p: '5px',
                                                                                m: 0,
                                                                                borderRadius: '50%'
                                                                            }}/>
                                                                        </IconButton>
                                                                        <Typography variant='body1'
                                                                                    fontWeight='bold'
                                                                                    sx={{color: '#444'}}>Set #{setIndex + 1}</Typography>

                                                                    </Grid>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Box>
                                                                        <CustomSlider
                                                                            formater={(v) => `${v} reps`}
                                                                            label='Reps'
                                                                            min={1}
                                                                            max={30}
                                                                            step={1}
                                                                            displayLabel='off'
                                                                            name={`exercises.${index}.sets.${setIndex}.reps`}
                                                                        />
                                                                    </Box>
                                                                    {/*<Box>*/}
                                                                    {/*    <CustomSwitch*/}
                                                                    {/*        label='Duration exercise'*/}
                                                                    {/*        name={`exercises.${index}.sets.${setIndex}.showDuration`}*/}
                                                                    {/*    />*/}
                                                                    {/*</Box>*/}
                                                                    {/*{(exercise.sets[setIndex]?.showDuration) ? (*/}
                                                                    {/*    <Box>*/}
                                                                    {/*        <CustomSlider*/}
                                                                    {/*            formater={formatSeconds}*/}
                                                                    {/*            displayLabel='off'*/}
                                                                    {/*            label='Duration'*/}
                                                                    {/*            name={`exercises.${index}.sets.${setIndex}.duration`}*/}
                                                                    {/*        />*/}
                                                                    {/*    </Box>*/}
                                                                    {/*) : null}*/}

                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}

                                                </Grid>
                                            </Box>

                                        )}
                                    </FieldArray>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </Grid>

            )}

        </FieldArray>
    );
}

export default ExerciseDetails;