import React, {useState} from 'react';
import {Box, Container} from "@mui/material";
import ExercisesFilters from "../components/exercises/ExercisesFilters.jsx";
import {FiltersProvider} from "../context/filtersProvider.jsx";
import ExercisesList from "../components/exercises/ExercisesList.jsx";
import Button from "@mui/material/Button";
import CustomDialog from "../components/CustomDialog.jsx";
import useDropdownMenu from "../hooks/useDropdownMenu.js";
import useAuth from "../hooks/useAuth.js";
import CustomExerciseForm from "../forms/CustomExerciseForm";


function Exercises({}) {
    const {open, handleClose, handleOpen} = useDropdownMenu();
    const [change, setChange] = useState(false);
    const {auth} = useAuth();
    return (
        <FiltersProvider>
            <Container sx={{display: 'flex', my: '40px', justifyContent: 'center', alignItems: 'flex-start'}}
                       maxWidth={"xl"}>
                <Box sx={{
                    backgroundColor: 'transparent',
                    width: '25%',
                    mr: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px solid #dfe7ff'
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

                    {auth?.user ? (<Button
                        onClick={handleOpen}
                        variant='outlined' sx={{
                        marginBottom: '20px',
                        width: '75%',
                    }}>Add Your Exercise</Button>) : null}

                </Box>
                <ExercisesList reload={change}/>
            </Container>
        </FiltersProvider>
    );
}


export default Exercises;