import { useEffect, useState } from "react";

export const useDimention = () => {
    const [dimension, setDimension] = useState({
        height: window.innerHeight - 35,
        width: window.innerWidth
    });
    const { width, height } = dimension;
    const isMobile = width <= 500

    useEffect(() => {
        const handleResize = () => {
            setDimension({
                height: window.innerHeight - 35,
                width: window.innerWidth
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return { width, height, isMobile }
}