import React from 'react';
import Button from "@mui/material/Button";

function StyledButton({children,sx,variant='outlined', ...props}) {
    return (
        <Button
            sx={{
                border: 'none',
                color: 'white',
                backgroundColor: '#3b3b3f',
                "&:hover": {
                    backgroundColor: '#3b4973',
                    border: 'none',
                },
                ...sx,
            }}
            variant={variant}
            {...props}
            >
            {children}
        </Button>
    );
}

export default StyledButton;