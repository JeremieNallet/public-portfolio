import styled from "styled-components";
import { motion as m } from "framer-motion";

//tree
import useReveal from "../../hooks/useReveal";
import TextReveal from "../misc/TextReveal";
import * as easing from "../../../lib/easing";
import { LAYOUT_OFFSET, SIZE } from "../../constant/mesure";

const SectionTitle = ({ text, number, ...rest }) => {
    const { ref, animate } = useReveal(0);

    const numberVariant = {
        hidden: {
            y: 100,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <SectionTitleStyles {...rest}>
            <m.small
                transition={easing.expoFast}
                variants={numberVariant}
                animate={animate}
                className="section-number"
            >
                {number}
            </m.small>
            <h2 ref={ref} className="section-title">
                <TextReveal
                    animate={animate}
                    className="section-title__chars"
                    text={text}
                />
            </h2>
        </SectionTitleStyles>
    );
};

const SectionTitleStyles = styled.div`
    margin-left: ${LAYOUT_OFFSET}%;
    margin-bottom: 5rem;
    cursor: default;
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: ${SIZE.mobile}px) {
        margin-left: 0%;
        margin-bottom: 0;
    }
    .section-number {
        font-family: "graphik-regular";
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colorHighlight};
        position: absolute;
        left: -8rem;
    }
    .section-title {
        &__chars {
            font-family: "noe-medium";
            font-size: 10rem;
            letter-spacing: -0.05em;
            @media (max-width: ${SIZE.mobile}px) {
                font-family: "graphik-regular";
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-left: 0.3rem;
                color: ${({ theme }) => theme.colorHighlight};
            }
        }
    }
`;

export default SectionTitle;
