import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import StretchExercise from "../exercises/StretchExercise.jsx";

function StretchingSuggestion({bodyParts}) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await fetch(`../input.json`, {
                    signal: controller.signal
                });
                const stretchExercises = await response.json();
                const data = stretchExercises.filter(exercise => exercise.name.includes('stretch') && bodyParts.includes(exercise.target)) ;
                if (!ignore) {
                    setExercises(data);
                }
            } catch (e) {
                console.log(e);
                setExercises([]);
            }
        }
        getData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
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