import { useState } from "react";
import styled from "styled-components";
import { motion as m } from "framer-motion";

import { useStore } from "../../../lib/store";
import * as easing from "../../../lib/easing";
import useCursorAction from "../../hooks/useCursorAction";
import { SIZE } from "../../constant/mesure";

const Switch = ({ ...rest }) => {
    const WIDTH = 2.5;
    const [isChecked, setIsChecked] = useState(false);
    const setThemeTransition = useStore((state) => state.setThemeTransition);
    const { cursorEnter, cursorOut } = useCursorAction("fit");

    const switchTheme = (event) => {
        const { checked } = event.target;
        setIsChecked(checked);
        setTimeout(() => {
            setThemeTransition({
                active: true,
                nextTheme: `${checked ? "dark" : "light"}`,
            });
        }, 450);
    };

    return (
        <SwitchStyles WIDTH={WIDTH} {...rest}>
            <label className="switch">
                <input
                    value={isChecked}
                    onChange={switchTheme}
                    type="checkbox"
                    className="switch__input"
                />
                <span className="switch__item">
                    <m.span
                        onMouseOver={cursorEnter}
                        onMouseOut={cursorOut}
                        transition={{ ...easing.expoFast, duration: 1 }}
                        animate={{ x: `${isChecked ? WIDTH : 0}rem` }}
                        className="ball"
                    />
                </span>
            </label>
        </SwitchStyles>
    );
};

const SwitchStyles = styled(m.div)`
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 5;
    bottom: 3.8rem;
    margin-left: 2rem;
    @media (max-width: ${SIZE.mobile}px) {
        margin-left: 0.7rem;
        bottom: 2.2rem;
    }

    .switch {
        height: 0.4rem;
        position: relative;
        display: inline-block;
        width: ${({ WIDTH }) => WIDTH}rem;
        border-radius: 2rem;

        &__input {
            display: none;
        }
        &__item {
            cursor: pointer;
            border-radius: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: 0.2s;
            background-color: ${({ theme }) => theme.colorHighlight};

            .ball {
                --size: 1.7rem;
                height: var(--size);
                width: var(--size);
                border-radius: 50%;
                top: calc(50% - var(--size) / 2);
                right: -1rem;
                left: -1rem;

                border: 0.4rem solid ${({ theme }) => theme.colorHighlight};

                background-color: ${({ theme }) => theme.colorBackground};
                position: absolute;
                right: -1rem;
                left: -1rem;
            }
        }
    }
`;

export default Switch;
