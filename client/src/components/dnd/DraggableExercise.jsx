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