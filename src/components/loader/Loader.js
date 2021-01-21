import { useEffect, useRef, useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";
import { useStore } from "../../../lib/store";
import site from "../../../content/config/site";
import LoaderReveal from "./LoaderReveal";
import { SIZE } from "../../constant/mesure";

const Loader = () => {
    const loader = useStore((state) => state.loader);
    const setLoader = useStore((state) => state.setLoader);
    const setCursor = useStore((state) => state.setCursor);
    const [loadingTime, setLoadingTime] = useState(0);
    const bigTextRef = useRef();

    useEffect(() => {
        let timeout = setTimeout(() => {
            setLoadingTime((load) => {
                return load === 100 ? load : load + 1;
            });

            if (loadingTime === 100) {
                //FIRST
                setLoader({ complete: true });
                //SECOND
                setTimeout(() => setLoader({ reveal: true }), 1300);
                //THIRD
                setTimeout(() => setLoader({ scrollReady: true }), 3500);
            }
        }, 30);

        return () => clearTimeout(timeout);
    }, [loadingTime, setLoader]);

    useEffect(() => {
        if (bigTextRef.current) {
            const { current: loadingText } = bigTextRef;
            const { left, right, top } = loadingText.getBoundingClientRect();

            const ADJUST_HEIGHT = 1.4;
            const MID_POINT = (left + right - 23) / 2;
            const TOP_POINT = top / ADJUST_HEIGHT;

            const bindings = { x: MID_POINT, y: TOP_POINT };
            setCursor({ loaderBinding: bindings });
        }
    }, [loader, setCursor]);

    //ORCHESTRATIONS
    const bigTextContainer = {
        animate: {
            transition: {
                staggerChildren: 0.06,
                staggerDirection: -1,
            },
        },
        exit: () => ({
            transition: {
                staggerChildren: 0.04,
                staggerDirection: -1,
            },
        }),
    };

    const smallTextContainer = {
        animate: {
            transition: {
                staggerChildren: 0.01,
                delayChildren: 0.1,
                staggerDirection: -1,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.01,
                staggerDirection: -1,
            },
        },
    };

    const bigTextVariants = {
        initial: { y: 20, x: 10, rotateX: 90, rotate: 0, opacity: 0 },
        animate: { y: 0, x: 0, rotateX: 0, rotate: 0, opacity: 1 },
        exit: { y: -20, x: -10, rotateX: -90, rotate: 0, opacity: 0 },
    };
    const smallTextVariants = {
        initial: { y: 70, x: 50, rotateX: 90, rotate: 10, opacity: 0 },
        animate: { y: 0, x: 0, rotateX: 0, rotate: 0, opacity: 1 },
        exit: { y: 20, x: -10, rotateX: -90, rotate: 0, opacity: 0 },
    };

    return (
        <>
            <LoaderReveal />
            <AnimatePresence>
                {!loader.complete && (
                    <LoaderStyles>
                        <div ref={bigTextRef} className="text">
                            <m.div
                                variants={bigTextContainer}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text__big"
                            >
                                {site.loaderTitle.split("").map((letter, i) => {
                                    return (
                                        <m.span
                                            key={i}
                                            transition={{
                                                ...easing.expoFast,
                                                duration: 2.6,
                                            }}
                                            variants={bigTextVariants}
                                            className="text__big--chars"
                                        >
                                            {letter}
                                        </m.span>
                                    );
                                })}
                            </m.div>
                            <m.div
                                variants={smallTextContainer}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text__small"
                            >
                                {site.loaderSmallText
                                    .split("")
                                    .map((letter, i) => {
                                        const display =
                                            letter !== " "
                                                ? "inline-block"
                                                : "inline";
                                        return (
                                            <m.span
                                                key={i}
                                                variants={smallTextVariants}
                                                transition={{
                                                    ...easing.expoFast,
                                                    duration: 2.6,
                                                }}
                                                className="text__small--chars"
                                                style={{ display }}
                                            >
                                                {letter}
                                            </m.span>
                                        );
                                    })}
                            </m.div>
                        </div>

                        <m.span
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={smallTextVariants}
                            transition={{
                                ...easing.expoFast,
                                duration: 2.6,
                            }}
                            className="progress-bar"
                        >
                            <span className="progress-bar__numbers">
                                {loadingTime}%
                            </span>
                            <span className="progress-bar__line">
                                <span
                                    style={{ width: loadingTime + "%" }}
                                    className="progress-bar__line--inner"
                                />
                            </span>
                        </m.span>
                    </LoaderStyles>
                )}
            </AnimatePresence>
        </>
    );
};

const LoaderStyles = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: ${({ theme }) => theme.colorBackground};

    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;

    .text {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 15vh;
        &__big {
            &--chars {
                transform-origin: top;
                display: inline-block;
                font-family: noe-regular;
                font-size: 12rem;
                @media (max-width: ${SIZE.mobile}px) {
                    font-size: 18vw;
                }
            }
        }
        &__small {
            margin-top: -1rem;
            &--chars {
                font-size: 1.8rem;
                display: inline-block;

                @media (max-width: ${SIZE.mobile}px) {
                    font-size: 1.5rem;
                }
            }
        }
    }

    .progress-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow-y: hidden;

        position: fixed;
        bottom: 6rem;

        &__numbers {
            display: inline-block;
            margin-bottom: 1rem;
        }
        &__line {
            width: 10rem;
            height: 0.1rem;
            background: grey;
            position: relative;
            display: inline-block;
            &--inner {
                background: ${({ theme }) => theme.colorBackground};
                width: 100%;
                height: 100%;
                opacity: 1;
                position: absolute;
            }
        }
    }
`;

export default Loader;
