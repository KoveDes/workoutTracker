import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import StretchExercise from "../exercises/StretchExercise.jsx";
import useLogout from "../../hooks/useLogout.js";

function StretchingSuggestion({bodyParts}) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const storedExercises = JSON.parse(sessionStorage.getItem('exercisesData'));
        if (!storedExercises) {
            const logout = useLogout();
            logout();
        } else {
            const stretchExercises = storedExercises.filter(exercise => exercise.name.includes('stretch') && bodyParts.includes(exercise.target))
            setExercises(stretchExercises)
        }

    }, [])

    return (
        <Container >
            <Grid container spacing={3}  alignItems='center' justifyContent='center'
                  sx={{p: '20px', pr: '20px'}}>
                {exercises?.map((exercise) => (
                    <Grid item key={exercise.id ? exercise.id : exercise._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <StretchExercise exercise={exercise}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}


export default StretchingSuggestion;