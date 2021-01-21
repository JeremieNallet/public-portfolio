import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

//tree
import * as easing from "../../lib/easing";

const useParalaxOver = (OFFSET = 180) => {
    const MOUSE_PARALAX_OFFSET = OFFSET;
    const motion = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };
    const paralaxStyle = {
        x: useSpring(motion.x, easing.spring),
        y: useSpring(motion.y, easing.spring),
    };
    useEffect(() => {
        const movingCursor = ({ clientX, clientY }) => {
            const offsetX = clientX - window.innerWidth / 2;
            const offsetY = clientY - window.innerHeight / 2;
            motion.x.set(offsetX / MOUSE_PARALAX_OFFSET);
            motion.y.set(offsetY / MOUSE_PARALAX_OFFSET);
        };
        window.addEventListener("mousemove", movingCursor);
        return () => window.removeEventListener("mousemove", movingCursor);
    }, [MOUSE_PARALAX_OFFSET, motion.x, motion.y]);

    return { paralaxStyle };
};

export default useParalaxOver;
