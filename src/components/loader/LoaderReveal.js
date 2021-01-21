import { useEffect, useState } from "react";
import { motion as m, AnimatePresence, useAnimation } from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";
import { useStore } from "../../../lib/store";
import useResponsive from "../../hooks/useResponsive";

const LoaderReveal = () => {
    const loader = useStore((state) => state.loader);
    const [columnLength, setColumnLength] = useState(10);

    const column = [...Array(parseInt(columnLength)).keys()];
    const stripes = [...Array(parseInt(10)).keys()];

    const slicerControls = useAnimation();
    const isMobile = useResponsive();

    useEffect(() => {
        setColumnLength(`${isMobile ? 5 : 10}`);
    }, [isMobile]);

    useEffect(() => {
        slicerControls.start(`${loader.complete ? "isSlicing" : "notSlicing"}`);
    }, [slicerControls, loader.complete]);

    const slicerVariants = {
        notSlicing: () => ({
            opacity: 1,
            scaleY: 0,
        }),
        isSlicing: (i) => ({
            opacity: 0,
            scaleY: 1,
            transition: {
                delay: i * 0.05,
                ...easing.expoFast,
            },
        }),
    };

    const stripeContainer = {
        exit: {
            transition: {
                staggerChildren: 0.04,
                staggerDirection: 1,
            },
        },
    };
    const stripeVariants = {
        initial: {
            transform: "scaleX(1.02) scaleY(1.4) translateZ(0)",
        },
        exit: {
            transform: "scaleX(0) scaleY(1) translateZ(0)",
        },
    };

    return (
        <AnimatePresence>
            {!loader.reveal && (
                <LoaderRevealStyles
                    initial={false}
                    animate="initial"
                    exit="exit"
                >
                    {column.map((i) => (
                        <m.div
                            key={i}
                            variants={stripeContainer}
                            className="columns"
                        >
                            <m.div
                                key={i}
                                custom={i}
                                initial={{ scaleY: 0 }}
                                animate={slicerControls}
                                variants={slicerVariants}
                                className="columns--slicers"
                            />

                            {stripes.map((i) => (
                                <m.div
                                    variants={stripeVariants}
                                    transition={{
                                        ...easing.expoFast,
                                        duration: 2,
                                    }}
                                    className="stripes"
                                    key={i}
                                />
                            ))}
                        </m.div>
                    ))}
                </LoaderRevealStyles>
            )}
        </AnimatePresence>
    );
};

const LoaderRevealStyles = styled(m.div)`
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    display: flex;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .columns {
        height: inherit;
        width: inherit;
        display: flex;
        flex-direction: column;
        position: relative;
        &--slicers {
            height: 100%;
            width: 0.1rem;
            background: ${({ theme }) => theme.colorBackground};
            display: flex;
            transform-origin: bottom;
            position: absolute;
            z-index: 999;
        }
    }
    .stripes {
        transform-origin: left;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colorBlack};
    }
`;

export default LoaderReveal;
