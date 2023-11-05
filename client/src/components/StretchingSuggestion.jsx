import React, {useEffect, useState} from 'react';
import {useFilters} from "../hooks/useFilters.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Container, Grid} from "@mui/material";
import DraggableExercise from "./dnd/DraggableExercise.jsx";
import StretchExercise from "./exercises/StretchExercise.jsx";

function StretchingSuggestion({bodyParts}) {
    const [exercises, setExercises] = useState([]);
    const [change, setChange] = useState(false);

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

                // const filteredData = (showUserExercisesOnly ? renamedUserExercises : data)
                //     .filter(exercise => {
                //         const matchesEquipment = filters.equipment.trim() ? exercise.equipment.toLowerCase() === filters?.equipment.toLowerCase().trim() : true;
                //         const matchesTarget = filters.target.trim() ? exercise.target.toLowerCase() === filters?.target.toLowerCase().trim() : true;
                //         const matchesName = filters.search ? exercise.name.toLowerCase().includes(filters?.search.toLowerCase()) : true;
                //         if (matchesEquipment && matchesTarget && matchesName) return true;
                //     });

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
                // height='850px'
                  sx={{
                      p: '20px', pr: '20px',
                      // overflowY: 'scroll',
                  }}>
                {exercises.map((exercise) => (
                    <Grid item key={exercise.id ? exercise.id : exercise._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <StretchExercise exercise={exercise}/>
                    </Grid>
                ))}

            </Grid>

        </Container>
    );
}


export default StretchingSuggestion;