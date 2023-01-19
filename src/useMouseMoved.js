/* jshint esversion: 6 */

import { useState, useEffect } from "react";

const obj = {
/*  Structure:
    [ms]: {
        timeout: (timeout ID),
        setMousedMovedSet: Set (
            (func) setMouseMoved,
            (func) setMouseMoved,
            ...
        )
    }
*/
};

function useMouseTimer (ms) {
    if (typeof ms !== "number" || (ms > 0) === false) {
        throw new Error("'useMouseTimer' ms must be a number greater than 0 (milliseconds)!");
    }
    const [mouseMoved, setMouseMoved] = useState(obj[ms] ? true : false);
    useEffect(() => {
        function handleMouseMove() {
            if (obj[ms]) {
                clearTimeout(obj[ms].timeout);
            } else {
                obj[ms] = {setMousedMovedSet: new Set()};
            }
            obj[ms].setMousedMovedSet.add(setMouseMoved);
            obj[ms].timeout = setTimeout(() => {
                for (const func of obj[ms].setMousedMovedSet) {
                    func(false);
                }
                delete obj[ms];
            }, ms);
            setMouseMoved(true);
        }
        if (!Object.keys(obj).length) { // Add 'mousemove' event listener if one does not yet exist
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (!Object.keys(obj).length) { // Remove 'mousemove' if no hooks are using it
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [ms]);
    return mouseMoved;
}

export default useMouseTimer;