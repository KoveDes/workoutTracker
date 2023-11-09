import React from 'react';
import {Box, Tooltip} from "@mui/material";
import LoadUp from '../../assets/Right Arrow Curving Up.png'
import LoadDown from '../../assets/Right Arrow Curving Down.png'
import LoadOk from '../../assets/Sparkle.png'

function RpeSuggestion({rpe}) {
    const recommendation = rpe >= 9 ? 'lowering the load' : rpe >= 7 ? 'keeping the same load' : 'increasing the load'
    const description = `Based on your previous RPE (${rpe}), we suggest ${recommendation}` ;
    return (
        <Tooltip title={description}>
            <Box
                component='img'
                src={rpe >= 9 ? LoadDown : rpe >= 7 ? LoadOk : LoadUp}
                sx={{
                    height: '39px',
                    filter: [7, 8].includes(rpe) ? '' : 'hue-rotate(127deg)',
                    animation: 'blurAnimation 1s infinite ease-in;'
                }}
            />
        </Tooltip>
    );
}

export default RpeSuggestion;