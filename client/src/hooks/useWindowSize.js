import {useLayoutEffect, useState} from "react";


export default function useWindowSize() {
    const [size, setSize] = useState({
        width: null,
        height: null
    });

    useLayoutEffect(() => {
        const handler = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        handler();
        window.addEventListener("resize", handler);
        return () => {
            window.removeEventListener("resize", handler);
        };
    }, []);

    return size;
}