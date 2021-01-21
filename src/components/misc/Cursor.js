import { useEffect, useMemo } from "react";
import { useMotionValue, useSpring, motion as m } from "framer-motion";

//tree
import * as easing from "../../../lib/easing";
import { CURSOR_OFFSET } from "../../constant/mesure";
import styled from "styled-components";
import { useStore } from "../../../lib/store";
import { colorRed, colorBlack } from "../../styles/theme";

const Cursor = () => {
    const cursor = useStore((state) => state.cursor);
    const loader = useStore((state) => state.loader);
    const theme = useStore((state) => state.theme);
    const isGameShowing = useStore((state) => state.isGameShowing);

    const motion = {
        x: useMotionValue(0),
        y: useMotionValue(0),
        fill: useMotionValue(colorBlack),
        scale: useMotionValue(cursor.size),
    };

    const spring = {
        x: useSpring(motion.x, easing.spring),
        y: useSpring(motion.y, easing.spring),
        scale: useSpring(motion.scale),
    };

    useEffect(() => {
        //APP IS READY
        motion.scale.set(cursor.size);

        if (loader.complete) {
            motion.fill.set(colorRed);
            if (!isGameShowing) {
                const movingCursor = ({ clientX, clientY }) => {
                    motion.y.set(
                        cursor.hoverBinding.y || clientY - CURSOR_OFFSET
                    );
                    motion.x.set(
                        cursor.hoverBinding.x || clientX - CURSOR_OFFSET
                    );
                };
                window.addEventListener("mousemove", movingCursor);
                return () => {
                    window.removeEventListener("mousemove", movingCursor);
                };
            } else {
                if (cursor.gameFoodBinding.y && cursor.gameFoodBinding.x) {
                    motion.y.set(cursor.gameFoodBinding.y);
                    motion.x.set(cursor.gameFoodBinding.x);
                }
            }
        } else {
            if (cursor.loaderBinding.y && cursor.loaderBinding.x) {
                motion.x.set(cursor.loaderBinding.x);
                motion.y.set(cursor.loaderBinding.y);
                motion.scale.set(1.5);
            }
        }
    }, [
        cursor.hoverBinding.x,
        cursor.hoverBinding.y,
        cursor.gameFoodBinding.x,
        cursor.gameFoodBinding.y,
        cursor.loaderBinding,
        cursor.size,
        loader.complete,
        motion.fill,
        motion.scale,
        motion.x,
        motion.y,
        isGameShowing,
    ]);

    const cursorContainerStyles = useMemo(
        () => ({
            translateX: spring.x,
            translateY: spring.y,
            mixBlendMode:
                cursor.alpha && theme === "dark"
                    ? "lighten"
                    : cursor.alpha && theme === "light"
                    ? "multiply"
                    : "initial",
        }),
        [cursor.alpha, spring.x, spring.y, theme]
    );

    const cursorStyles = useMemo(
        () => ({
            fill: cursor.fill ? motion.fill : "none",
            scale: spring.scale,
            strokeWidth: 0.7,
        }),
        [cursor.fill, motion.fill, spring.scale]
    );

    return (
        <CursorStyles style={cursorContainerStyles}>
            <m.svg
                style={cursorStyles}
                className="cursor"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "100 100" }}
                transition={{ ...easing.expoFast, duration: 7 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                points="6 9 12 15 18 9"
            >
                <circle cx="12" cy="12" r="10" />
            </m.svg>
        </CursorStyles>
    );
};

const CursorStyles = styled(m.div)`
    position: fixed;
    z-index: 999;

    transform-origin: center;
    pointer-events: none;
    will-change: transform;

    -moz-appearance-mix-blend-mode: none;
    border: 1px solid transparent;
    .cursor {
        stroke: ${({ theme }) => theme.colorHighlight};
    }
`;

export default Cursor;
