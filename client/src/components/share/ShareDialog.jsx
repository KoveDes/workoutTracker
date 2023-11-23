import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React, {useRef} from "react";
import StyledButton from "../StyledButton.jsx";
import RoutineContent from "./RoutineContent.jsx";
import html2canvas from "html2canvas";
import {Link} from "@mui/material";
import WorkoutContent from "./WorkoutContent.jsx";

function ShareDialog({open, handleClose, data, type}) {
    const contentRef = useRef();
    const saveImage = async () => {
        const canvas = await html2canvas(contentRef.current);
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `GymTrackr-${type === 'routine' ? 'Routine' : 'Workout' }-${data.name}.png`;
        a.click();
    }

    return (
        <Dialog
            maxWidth='auto'
            open={open}
            onClose={handleClose}
        >

            <DialogContent ref={contentRef}>
                {type === 'routine' ? (
                <RoutineContent data={data}/>
                ) : (
                 <WorkoutContent data={data} />
                )}
            </DialogContent>
            <DialogActions>
                <StyledButton
                    component={Link}
                    onClick={saveImage} autoFocus>
                    Save image
                </StyledButton>
            </DialogActions>
        </Dialog>
    );
}

export default ShareDialog;