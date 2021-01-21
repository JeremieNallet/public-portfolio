import { useState } from "react";
import styled from "styled-components";
import { motion as m, useMotionValue, useSpring } from "framer-motion";

//tree
import * as easing from "../../../lib/easing";
import useCursorAction from "../../hooks/useCursorAction";
import { SIZE } from "../../constant/mesure";

const DISTANCE = 50;

const BigButton = ({ text = "", color = "secondary", onClick, ...rest }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { cursorOut, cursorEnter } = useCursorAction("shrink");

    const spring = {
        x: useSpring(useMotionValue(0), easing.spring),
        y: useSpring(useMotionValue(0), easing.spring),
    };

    const _onMouseMovve = (e) => {
        const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
        const { left, top } = e.currentTarget.getBoundingClientRect();

        const offsetX = Math.abs(Math.round(left - e.clientX));
        const offsetY = Math.abs(Math.round(top - e.clientY));

        spring.x.set(Math.round((offsetX / width) * DISTANCE - DISTANCE / 2));
        spring.y.set(Math.round((offsetY / height) * DISTANCE - DISTANCE / 2));
        setIsHovering(true);
    };

    const _onMouseLeave = () => {
        spring.x.set(0);
        spring.y.set(0);
        setIsHovering(false);
        cursorOut();
    };

    const _onMouseOver = (e) => {
        cursorEnter(e);
        setIsHovering(true);
    };

    const _onClick = (e) => {
        if (onClick) onClick(e);
        cursorOut();
    };

    return (
        <BigButtonStyles
            color={color}
            style={{ x: spring.x, y: spring.y, display: "inline-block" }}
            onMouseOver={_onMouseOver}
            onMouseLeave={_onMouseLeave}
            onMouseMove={_onMouseMovve}
            onClick={_onClick}
            className="submit__btn"
            {...rest}
        >
            <m.span
                className="text"
                style={{ x: spring.x, y: spring.y }}
                onMouseMove={_onMouseMovve}
                onMouseLeave={_onMouseLeave}
            >
                {text}
            </m.span>

            {isHovering && <m.span className="border" />}
        </BigButtonStyles>
    );
};

const BigButtonStyles = styled(m.button)`
    --size: 19rem;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    color: white;
    font-size: 1.6rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: "graphik-semi";
    position: relative;
    will-change: transform;

    @media (max-width: 412px) {
        --size: 14rem;
    }

    background: ${({ color, theme }) => {
        if (color === "primary") {
            return theme.colorLightBackground;
        } else if (color === "secondary") {
            return theme.colorHighlight;
        }
    }};
    color: ${({ color, theme }) => {
        if (color === "primary") {
            return theme.colorSecondary;
        } else if (color === "secondary") {
            return "white";
        }
    }};

    .text {
        display: block;
        pointer-events: none;
        will-change: transform;
        font-size: 1.5rem;
        @media (max-width: ${SIZE.mobile}px) {
            font-size: 1.3rem;
        }
    }

    .border {
        width: 108%;
        height: 108%;
        position: absolute;
        top: -4%;
        left: -4%;
        background-color: none;
        border-radius: 50%;
        border: 1px solid ${({ theme }) => theme.colorHighlight};
        animation: scale 0.2s;

        will-change: transform;

        border: ${({ color, theme }) => {
            if (color === "primary") {
                return `1px solid ${theme.colorLightBackground}`;
            } else if (color === "secondary") {
                return `1px solid ${theme.colorHighlight}`;
            }
        }};
    }

    @keyframes scale {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: translate(1);
        }
    }
`;

export default BigButton;
