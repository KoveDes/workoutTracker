import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {closestCenter, DndContext, PointerSensor, useDroppable, useSensor, useSensors} from "@dnd-kit/core";
import SelectedExercise from "../exercises/SelectedExercise.jsx";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import exercises from "../../pages/Exercises.jsx";

function DroppableBox({selected, setSelected, formik}) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'selectedExercises',
        // disabled: selected.length === 4
    })
    const droppableStyles = {
        borderColor: isOver ? 'lightgreen' : 'initial',
        transition: 'border-color 0.3s ease-out',
        animation: isOver ? 'pulse 1s infinite' : 'none'
    }
    //SORTABLE
    const selectedIds = selected.map(item => item.exercise?.id || item?.exercise._id);
    const sensors = useSensors(useSensor(PointerSensor));
    const handleDragEnd = e => {
        const {active, over} = e;
        if (active.id !== over.id) {
            const oldIndex = selected.findIndex(ex => (ex.exercise?.id || ex?.exercise._id) === active.id);
            const newIndex = selected.findIndex(ex => (ex.exercise?.id || ex?.exercise._id) === over.id);
            formik.move(oldIndex, newIndex)
            // return arrayMove(selected, oldIndex, newIndex)
            //
            // setSelected((exercises) => {
            //     // console.log(active.id, over.id)
            //     const oldIndex = exercises.findIndex(ex => (ex?.id || ex?._id) === active.id);
            //     const newIndex = exercises.findIndex(ex => (ex?.id || ex?._id) === over.id);
            //     // console.log(oldIndex, newIndex)
            //     return arrayMove(exercises, oldIndex, newIndex);
            // });
        }
    }

    return (
        <Box ref={setNodeRef}
             sx={{
                 border: '2px dashed cornflowerblue',
                 minHeight: '500px',
                 p: '10px',
                 // width: '50%',
                 boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                 ...droppableStyles,
             }}
        >
            {/*<Grid container spacing={3} alignItems={'flex-start'} sx={{*/}
            {/*    pb: '20px', pr: '20px'*/}
            {/*}}>*/}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <Typography variant='h5'>Select exercises (12 max)</Typography>
                <Grid container direction='column' gap={1}>
                    <SortableContext items={selectedIds} strategy={verticalListSortingStrategy}>
                    {selected.length > 0 ? selected.map(((ex, index) => (
                        <SelectedExercise exercise={ex} index={index} key={ex.exercise.name} remove={formik.remove}/>
                    ))) : 'Select minimum 1 exercise'}
                    </SortableContext>
                </Grid>
            </DndContext>

            {/*</Grid>*/}
        </Box>
    );
}

export default DroppableBox;