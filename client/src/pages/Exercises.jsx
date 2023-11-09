import React, {useState} from 'react';
import {Box, Container, Grid} from "@mui/material";
import ExercisesFilters from "../components/exercises/ExercisesFilters.jsx";
import {FiltersProvider} from "../context/filtersProvider.jsx";
import ExercisesList from "../components/exercises/ExercisesList.jsx";
import Button from "@mui/material/Button";
import CustomDialog from "../components/CustomDialog.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useAuth from "../hooks/useAuth.js";
import CustomExerciseForm from "../forms/CustomExerciseForm";
import StyledButton from "../components/StyledButton.jsx";


function Exercises({}) {
    const {open, handleClose, handleOpen} = useDropdownMenu();
    const [change, setChange] = useState(false);
    const {auth} = useAuth();
    return (
        <FiltersProvider>
            <Grid container justifyContent='center' wrap='nowrap'>
                <Box sx={{
                    backgroundColor: 'transparent',
                    minWidth: '280px',
                    mr: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px solid #dfe7ff',
                    borderRadius: '25px',
                    height: 'max-content',
                }}>
                    <ExercisesFilters/>
                    <CustomDialog
                        open={open}
                        handleClose={handleClose}
                        label={'Add your exercise'}
                        width='lg'
                        formId='customExerciseForm'
                        showButtons={true}
                    >
                        <CustomExerciseForm setChange={setChange} />
                    </CustomDialog>

                    {auth?.user ? (<StyledButton
                        onClick={handleOpen}
                        sx={{
                        marginBottom: '20px',
                        width: '75%',
                    }}>Add Your Exercise</StyledButton>) : null}
                </Box>
                <ExercisesList reload={change}/>
            </Grid>
        </FiltersProvider>
    );
}


export default Exercises;