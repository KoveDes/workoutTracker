import React, {useEffect, useState} from 'react';
import {Container, Grid, Pagination, Stack, Typography} from "@mui/material";
import ExerciseItem from "./ExerciseItem.jsx";
import {useFilters} from "../../hooks/useFilters.js";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import DraggableExercise from "../dnd/DraggableExercise";

function ExercisesList({reload}) {
    const [exercises, setExercises] = useState([]);
    const [change, setChange] = useState(false);
    const [showUserExercisesOnly, setShowUserExercisesOnly] = useState(false)
    const [total, setTotal] = useState(0);
    const {filters} = useFilters();
    const pages = Math.round(total / 16) !== 0 ? Math.round(total / 16) : 1;
    const [page, setPage] = useState(1);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const {data: userExercises} = await axiosPrivate.get('/customExercise/all');
                const renamedUserExercises = userExercises.map(({ name, url, activeMuscles, equipment, primaryMuscle, _id }) => {
                    return { name, gifUrl: url, secondaryMuscles: activeMuscles, equipment, target: primaryMuscle, _id };
                });
                const exercisesResponse = await fetch(`input.json`, {
                    signal: controller.signal
                });
                const exercises = await exercisesResponse.json();
                const data = [...exercises.filter(exercise => !exercise.name.includes('stretch')), ...renamedUserExercises];

                const filteredData = (showUserExercisesOnly ? renamedUserExercises : data)
                    .filter(exercise => {
                    const matchesEquipment = filters.equipment.trim() ? exercise.equipment.toLowerCase() === filters?.equipment.toLowerCase().trim() : true;
                    const matchesTarget = filters.target.trim() ? exercise.target.toLowerCase() === filters?.target.toLowerCase().trim() : true;
                    const matchesName = filters.search ? exercise.name.toLowerCase().includes(filters?.search.toLowerCase()) : true;
                    if (matchesEquipment && matchesTarget && matchesName) return true;
                });


                const paginatedData = filteredData.slice(page * 16 - 16, page * 16);
                if (paginatedData.length < 16 && page !== pages) {
                    setPage(1);
                }
                if (!ignore) {
                    setTotal(filteredData.length);
                    setExercises(paginatedData);
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
    }, [filters, page, showUserExercisesOnly, change, reload])

    return (
        <Container >
            <Grid container spacing={3}  alignItems={'flex-start'}
                  // height='850px'
                  sx={{
                 p: '20px', pr: '20px',
                // overflowY: 'scroll',
            }}>
                {exercises.map((exercise) => (
                    <Grid item key={exercise.id ? exercise.id : exercise._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <DraggableExercise exercise={exercise} custom={!!exercise._id} setChange={setChange} />
                        {/*<ExerciseItem exercise={exercise} custom={!!exercise._id} setChange={setChange}/>*/}
                    </Grid>
                ))}

            </Grid>
            <ExercisesPagination
                count={pages}
                setPage={setPage}
                page={page}
                total={total}
                setShowUserExercisesOnly={setShowUserExercisesOnly}
                showUsersExercisesOnly={showUserExercisesOnly}

            />
        </Container>
    );
}

function ExercisesPagination({count, total, setPage, page, setShowUserExercisesOnly ,showUsersExercisesOnly}) {
    const handlePageChange = (e, value) => {
        setPage(value);
    }
    return (
        <Stack spacing={3} position='relative'>
            <Pagination
                sx={{
                    justifyContent: 'center',
                    backgroundColor: 'unset',
                }}
                onChange={handlePageChange}
                page={page}
                count={count} shape="rounded"/>
            <Button
                onClick={() => setShowUserExercisesOnly( v => !v)}
                variant='outlined'
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                {showUsersExercisesOnly ? 'All exercises' : 'My exercises'}
            </Button>
            <Typography
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >Total: {total}</Typography>
        </Stack>
    );
}

export default ExercisesList;