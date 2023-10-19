import { useCallback, useRef, useState } from 'react';

export default function useDropdownMenu() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        anchorRef,
        handleClose,
        handleOpen,
        open
    };
}