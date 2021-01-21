import styled from "styled-components";
import { motion as m, AnimatePresence } from "framer-motion";
import { useRef } from "react";

//tree
import * as easing from "../../../lib/easing";
import { useStore } from "../../../lib/store";

const ThemeTransition = () => {
    const transitionRef = useRef(null);
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme);
    const setThemeTransition = useStore((state) => state.setThemeTransition);
    const themeTransition = useStore((state) => state.themeTransition);

    const layerCompletedStyles = { opacity: 1, scaleY: 1, skewY: 0 };

    const layerContainer = {
        start: { transition: { staggerChildren: 0.05 } },
        complete: { transition: { staggerChildren: 0.04 } },
    };
    const layerVariants = {
        start: { opacity: 1, scaleY: 0, skewY: 20 },
        complete: layerCompletedStyles,
        fade: { opacity: 0 },
    };

    return (
        <AnimatePresence exitBeforeEnter>
            {themeTransition.active && (
                <ThemeTransitionStyes
                    ref={transitionRef}
                    key="modal"
                    initial="start"
                    animate="complete"
                    exit="fade"
                    variants={layerContainer}
                    transition={{ ...easing.expoFast }}
                    currentTheme={theme}
                    onAnimationComplete={() => {
                        setThemeTransition({ active: false });
                        setTheme(themeTransition.nextTheme);
                    }}
                >
                    <m.div
                        className="layer top"
                        key="layer-1"
                        variants={{
                            ...layerVariants,
                            complete: {
                                ...layerCompletedStyles,
                                transitionEnd: { display: "none" },
                            },
                        }}
                        transition={easing.expoFast}
                    />

                    <m.div
                        className="layer bottom"
                        key="layer-2"
                        variants={layerVariants}
                        transition={easing.expoFast}
                    />
                </ThemeTransitionStyes>
            )}
        </AnimatePresence>
    );
};

const ThemeTransitionStyes = styled(m.div)`
    .layer {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100vw;
        transform-origin: bottom left;

        &.top {
            will-change: transform;
            background-color: ${({ theme }) => theme.colorHighlight};
        }
        &.bottom {
            will-change: transform;
            background: ${({ theme }) => theme.colorBlack};
        }
    }
`;

export default ThemeTransition;
