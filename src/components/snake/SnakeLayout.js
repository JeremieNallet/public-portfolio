import { useCallback, useEffect, useRef } from "react";
import { motion as m, useAnimation } from "framer-motion";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

//tree
import TextReveal from "../misc/TextReveal";
import BigButton from "../misc/BigButton";
import { useStore } from "../../../lib/store";
import * as easing from "../../../lib/easing";
import SnakeGame from "./SnakeGame";
import { SIZE } from "../../constant/mesure";
import AudioBtn from "../../components/misc/AudioBtn";
import { CURSOR_OFFSET } from "../../constant/mesure";

const SnakeLayout = () => {
    const foodRef = useRef(null);
    const gameScore = useStore((state) => state.gameScore);
    const setCursor = useStore((state) => state.setCursor);
    const toggleGame = useStore((state) => state.toggleGame);
    const isGameShowing = useStore((state) => state.isGameShowing);
    const controls = useAnimation();

    const placeCursorOnFood = useCallback(() => {
        if (foodRef.current) {
            const bindings = foodRef.current.getBoundingClientRect();
            const { left, right, top, bottom } = bindings;
            const xMidPoint = (left + right) / 2 - CURSOR_OFFSET;
            const yMidPoint = (top + bottom) / 2 - CURSOR_OFFSET;
            setCursor({ gameFoodBinding: { x: xMidPoint, y: yMidPoint } });
        }
    }, [setCursor]);

    useEffect(() => {
        controls.start(`${isGameShowing ? "visible" : "hidden"}`);
    }, [controls, isGameShowing]);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                ...easing.expoFast,
                staggerChildren: 0.1,
            },
        },
        exit: { opacity: 0 },
    };

    const slideInVariants = {
        initial: { rotate: 20, scaleX: 0, y: 100 },
        animate: { opacity: 1, scaleX: 1, rotate: 0, y: 0 },
        exit: { rotate: 10, y: -20 },
    };
    const lineVariants = {
        initial: { scaleY: 0 },
        animate: { scaleY: 1 },
        exit: { scaleY: 0 },
    };

    return (
        <SnakeLayoutStyles
            onScroll={() => placeCursorOnFood()}
            isMobile={isMobile}
            variants={containerVariants}
            transition={easing.expoFast}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="content">
                <AudioBtn className="content__audio-btn" />
                <div className="content__title">
                    <TextReveal
                        initial="hidden"
                        animate="visible"
                        text="Catch the dot."
                    />
                </div>
                <m.div
                    transition={easing.expoFast}
                    variants={slideInVariants}
                    className="content__score"
                >
                    <span>score: {gameScore}</span>
                </m.div>

                <m.div variants={lineVariants} className="content__line" />
                <m.div transition={easing.expoFast}>
                    <SnakeGame
                        foodRef={foodRef}
                        placeCursorOnFood={placeCursorOnFood}
                    />
                    <small className="content__helper">
                        Use the arrow keys or touch the screen to move the
                        snake.
                    </small>
                </m.div>
                <m.div
                    transition={easing.expoFast}
                    variants={slideInVariants}
                    className="content__button"
                >
                    <BigButton onClick={toggleGame} text="Close" />
                </m.div>
            </div>
        </SnakeLayoutStyles>
    );
};

const SnakeLayoutStyles = styled(m.div)`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    overflow: scroll;
    z-index: 9;
    min-height: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colorBackground};

    .content {
        margin: auto;
        padding: 1.5rem 0;
        text-align: center;

        &__audio-btn {
            position: fixed;
            top: 1.3rem;
            right: 1.5rem;
            @media (max-width: ${SIZE.mobile}px) {
                position: initial;
                display: flex;
                justify-content: center;
                width: 100%;
                margin: -0.5rem 0 0 0.5rem;
            }
        }

        &__helper {
            display: inline-flex;
            font-size: 1.2rem;
            opacity: 0.8;
            margin-top: 1rem;

            @media (max-width: ${SIZE.mobile}px) {
                text-align: center;
                font-size: 1rem;
                display: flex;
                justify-content: center;
                width: 100%;
            }
        }

        &__title {
            font-size: 6.5rem;
            letter-spacing: -0.03em;
            font-family: "noe-medium";
            transform-origin: top;
            margin-bottom: -1rem;

            @media (max-width: ${SIZE.smallMobile}px) {
                font-size: 14vw;
            }
        }
        &__score {
            font-family: "graphik-regular";
            font-size: 1.6rem;
            display: inline-flex;
            margin-bottom: 1rem;
            @media (max-width: ${SIZE.mobile}px) {
                font-size: 1.4rem;
                margin: 1rem 0 1.5rem 0;
            }
        }
        &__line {
            position: fixed;
            z-index: -1;
            height: 100vh;
            top: 0;
            left: 50%;

            width: 0.1rem;
            background: ${({ theme }) => theme.colorLine};
        }
        &__button {
            margin-top: 3rem;
        }
    }
`;

export default SnakeLayout;
