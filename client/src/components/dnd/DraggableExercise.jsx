import React, {useState} from 'react';
import useDropdownMenu from "../../hooks/useDropdownMenu.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import Card from "@mui/material/Card";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities'
import ExerciseItem from "../exercises/ExerciseItem";

function DraggableExercise({exercise, custom, setChange}) {
    const {isDragging,attributes, listeners, setNodeRef, transform} = useDraggable({
        id: exercise?.name,
        data: exercise
    });

    const style = {
        zIndex: isDragging ? 999 : 0,
        transform: CSS.Translate.toString(transform),
    };

    return (
        // <button ref={setNodeRef} style={style} {...listeners} {...attributes}>{exercise.name}</button>
        <ExerciseItem
            ref={setNodeRef}
            dragStyle={style}
            listeners={listeners}
            attributes={attributes}
            exercise={exercise}
            custom={custom}
            setChange={setChange} />
    );

}


export default DraggableExercise;