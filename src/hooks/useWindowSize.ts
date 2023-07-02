import { useEffect, useState } from "react"

export type WindowSize = {
    width: undefined | number,
    height: undefined | number,
}

/**
 * Provides a reactive object of type `WindowSize`. Updates on window `resize`.
 */
export const useWindowSize = () => {
    const [ windowSize, setWindowSize ] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

