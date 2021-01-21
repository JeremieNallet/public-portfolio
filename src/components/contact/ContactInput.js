import { useRef, useState } from "react";
import styled from "styled-components";
import TextArea from "react-textarea-autosize";
import { AnimatePresence, motion as m } from "framer-motion";

//tree
import * as easing from "../../../lib/easing";

const Input = ({ textarea = false, placeholder, type, name }) => {
    const inputRef = useRef(null);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const _onFocus = () => {
        setShowPlaceholder(false);
    };
    const _onBlur = () => {
        const hasValue = inputRef.current.value.trim();
        if (hasValue) return;
        setShowPlaceholder(true);
    };

    const lineVariants = {
        hidden: { width: "0%" },
        visible: { width: "100%" },
    };

    const textInputVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <InputStyles>
            {!textarea ? (
                <input
                    name={name}
                    required
                    ref={inputRef}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    className="input"
                    type={type}
                    id={name}
                />
            ) : (
                <TextArea
                    name={name}
                    required
                    type="text"
                    className="text-area"
                    ref={inputRef}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    id={name}
                />
            )}
            <AnimatePresence>
                {showPlaceholder && (
                    <m.label
                        htmlFor={name}
                        key="modal"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="placeholder"
                    >
                        <m.span
                            className="placeholder__text"
                            variants={textInputVariants}
                            transition={{ ...easing.expoFast, duration: 2.2 }}
                        >
                            {placeholder}
                        </m.span>
                    </m.label>
                )}
            </AnimatePresence>

            <m.span
                variants={lineVariants}
                transition={{ ...easing.expoFast, duration: 2.2 }}
                className="bottom-line"
            />
        </InputStyles>
    );
};

const InputStyles = styled.div`
    width: 100%;
    position: relative;
    min-height: 3rem;
    margin-bottom: 4.5rem;

    .text-area {
        margin-top: -0.3rem;
        background: none;
        border: none;
        resize: none;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        justify-content: center;
        align-items: center;
        line-height: 2em;
        text-indent: 0.2rem;
    }
    .input {
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        position: absolute;
        padding: 0 0.2rem;

        font-family: inherit;
        font-size: inherit;
        color: inherit;
    }
    .placeholder {
        font-family: "graphik-regular";
        position: absolute;
        pointer-events: none;
        left: 0.2rem;
        top: 20%;
        transform: translateY(-50%);
        font-size: 1.5rem;
        transform-origin: left;
        overflow: hidden;
        &__text {
            display: block;
            transform-origin: left;
        }
    }
    .bottom-line {
        position: absolute;
        display: block;
        height: 0.1rem;
        bottom: 0;
        background-color: ${({ theme }) => theme.colorLine};
        filter: brightness(98%);
    }
`;
export default Input;
