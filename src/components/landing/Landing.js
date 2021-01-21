import { useEffect } from "react";
import styled from "styled-components";
import { motion as m, useAnimation } from "framer-motion";

//tree
import {
    introMobile,
    introDesktop,
    introScrollingText,
} from "../../../content/config/site";
import { SIZE } from "../../constant/mesure";
import useResponsive from "../../hooks/useResponsive";
import * as easing from "../../../lib/easing";
import { useStore } from "../../../lib/store";

const Landing = () => {
    const loader = useStore((state) => state.loader);
    const revealController = useAnimation();
    const isMobile = useResponsive();
    const bigText = isMobile ? introMobile : introDesktop;

    const hoveringLetters = ({ target }) => {
        target.classList.add("hover-effect");
        const timer = setTimeout(() => {
            target.classList.remove("hover-effect");
            clearTimeout(timer);
        }, 1000);
    };

    useEffect(() => {
        revealController.start(`${loader.reveal ? "visible" : "hidden"}`);
    }, [revealController, loader.reveal]);

    const phrasesVariants = {
        hidden: { x: 200, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: { ...easing.expoSlow, duration: 2, delay: i * 0.04 },
        }),
    };

    const scrollingIndicatorVariants = {
        animate: (i) => ({
            opacity: [1, 0, 1],
            transition: {
                delay: i * 0.02,
                repeat: Infinity,
                repeatDelay: 2,
                duration: 1.5,
            },
        }),
    };

    return (
        <LandingStyles>
            <h1 className="intro-text">
                {bigText.map((text, key) => (
                    <Lines
                        key={key}
                        custom={key}
                        animate={revealController}
                        className="line"
                        variants={phrasesVariants}
                        text={text}
                    >
                        {text.line.split("").map((letter, key) => {
                            let display =
                                letter === " " ? "inline" : "inline-block";

                            return (
                                <Letters
                                    key={key}
                                    style={{ display }}
                                    onMouseOver={hoveringLetters}
                                >
                                    {letter}
                                </Letters>
                            );
                        })}
                    </Lines>
                ))}
            </h1>

            <m.p
                animate={revealController}
                variants={phrasesVariants}
                className="indicator"
            >
                {introScrollingText.split("").map((letter, i) => {
                    const display = letter === " " ? "inline" : "inline-block";
                    return (
                        <m.span
                            custom={i}
                            style={{ display }}
                            className="indicator__chars"
                            animate="animate"
                            variants={scrollingIndicatorVariants}
                            key={i}
                        >
                            {letter}
                        </m.span>
                    );
                })}
            </m.p>
        </LandingStyles>
    );
};

const LandingStyles = styled(m.section)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    padding-bottom: 14rem;
    margin-bottom: 10rem;
    z-index: 2;
    cursor: default;
    @media (max-width: ${SIZE.smallDesktop}px) {
        margin-left: 5vw;
    }
    @media (max-width: ${SIZE.mobile}px) {
        margin-left: 0;
        padding-bottom: 5rem;
    }

    .intro-text {
        transform-origin: top;
        white-space: nowrap;
        line-height: 1.3em;
        font-family: noe-medium;
        font-size: calc(2rem + 3.3vw);
        margin-bottom: 1rem;

        @media (min-width: ${SIZE.bigDesktop}px) {
            font-size: 8.4rem;
        }

        @media (max-width: ${SIZE.smallDesktop}px) {
            font-size: 5.5vw;
        }

        @media (max-width: ${SIZE.mobile}px) {
            font-size: 5.2rem;
        }
        @media (max-width: ${SIZE.smallMobile}px) {
            font-size: 10.5vw;
        }
    }
    .indicator {
        display: inline-block;
        @media (max-width: ${SIZE.mobile}px) {
            display: none;
        }
        &__chars {
            font-size: 1.6rem;
        }
    }
`;

const Lines = styled(m.span)`
    color: ${({ theme, text }) => text.highlight && theme.colorHighlight};
    margin-right: ${({ text }) => text.inline && "1rem"};
    display: ${({ text }) => (text.inline ? "inline-block" : "block")};
`;

const Letters = styled.span`
    transition: 0.9s cubic-bezier(0.84, 0, 0.14, 0.99);
    &.hover-effect {
        transform: scaleX(-1) skew(10deg);
    }
`;

export default Landing;
