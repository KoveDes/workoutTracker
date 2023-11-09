import React from 'react';
import {Box, Chip, Grid, IconButton, ListItem, Tooltip, Typography} from "@mui/material";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function SelectedExercise({exercise, index, remove}) {
    const id = exercise.exercise?._id || exercise.exercise.id;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const handleDelete = () => {
        remove(index)
    }
    return (
        <ListItem
            sx={{
                height: '100px',
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                ...style,
            }}>

            <Grid container wrap='nowrap' gap={2} alignItems='center'>
                <Box
                    src={exercise?.exercise?.gifUrl}
                    component='img'
                    alt={exercise?.exercise.name}
                    sx={{height: '90px', objectFit: 'cover'}}
                />
                <Grid container direction='column' justifyContent='center' gap={0}>
                    <Tooltip title={exercise?.exercise.name.length > 20 ? exercise?.exercise.name : ''}>
                        <Typography
                            fontWeight='bold'
                            letterSpacing={-0.25}
                            sx={{
                                fontSize: {
                                    xl: '1.3rem',
                                    md: '0.9rem'
                                }
                            }}
                            color='#000000c2'
                        >{exercise?.exercise.name.length > 20 ? exercise?.exercise.name.slice(0, 13) + '...' : exercise?.exercise.name}</Typography>
                    </Tooltip>
                    <Grid container>
                        <Chip
                            sx={{backgroundColor: 'dodgerblue', color: 'white'}}
                            size='small' label={`Target: ${exercise?.exercise.target}`}/>
                    </Grid>
                </Grid>
                {/*DND OPTIONS*/}
                <IconButton onClick={handleDelete}
                ><ClearIcon sx={{color: 'dodgerblue'}}/></IconButton>
                <IconButton
                ><DragIndicatorIcon
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    sx={{color: 'dodgerblue'}}/></IconButton>

            </Grid>
        </ListItem>
    );
}

export default SelectedExercise;