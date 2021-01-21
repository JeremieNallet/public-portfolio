import { motion as m } from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";
import { useStore } from "../../../lib/store";
import { SIZE } from "../../constant/mesure";

const SideIndicator = () => {
    const sideIndicator = useStore((state) => state.sideIndicator);
    return (
        <SrollIndicatorStyles
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="content__scroll-indicator"
        >
            <div className="fixed-container">
                <span className="text">{sideIndicator.title}</span>
                <span className="line">
                    <m.span
                        transition={{
                            ...easing.expoFast,
                            duration: 0.8,
                        }}
                        initial={false}
                        animate={{
                            left: `${sideIndicator.progress}%`,
                        }}
                        className="line__chip"
                    />
                </span>
            </div>
        </SrollIndicatorStyles>
    );
};

const SrollIndicatorStyles = styled(m.div)`
    position: absolute;
    right: 5.5rem;
    top: 30vh;
    @media (max-width: ${SIZE.smallDesktop}px) {
        right: -3.2rem;
    }
    @media (max-width: ${SIZE.mobile}px) {
        display: none;
    }
    .fixed-container {
        position: fixed;
        display: block;
        white-space: nowrap;
        display: flex;
        align-items: center;
        transform: rotate(90deg);
        transform-origin: left top;
    }

    .text {
        margin-right: 2rem;
        width: 10rem;
        font-size: 1.1rem;
        letter-spacing: 0.1em;
        opacity: 0.8;
    }

    .line {
        position: relative;
        display: flex;
        width: 8rem;
        height: 0.2rem;
        margin-bottom: 0.2rem;
        background: ${({ theme }) => theme.colorLine};
        &__chip {
            background: ${({ theme }) => theme.colorHighlight};

            width: 2rem;
            height: 100%;
            transform: translateX(-50%);
            display: flex;
            left: 0%;
            position: absolute;
        }
    }
`;

export default SideIndicator;
