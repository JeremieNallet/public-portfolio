import styled from "styled-components";
import { motion as m } from "framer-motion";

//tree
import { LAYOUT_OFFSET, SIZE } from "../../constant/mesure";
import TextReveal from "../misc/TextReveal";
import useResponsive from "../../hooks/useResponsive";
import useReveal from "../../hooks/useReveal";
import * as easing from "../../../lib/easing";

/**
 * @param {HTMLElement} htmlString
 */
const LayoutInner = ({
    title,
    children,
    animateContent = true,
    htmlString,
    ...rest
}) => {
    const isMobile = useResponsive();
    const { ref, animate } = useReveal(0);

    const translateVariants = {
        hidden: { opacity: 0, y: 80, rotate: 2 },
        visible: { opacity: 1, y: 0, rotate: 0 },
    };

    return (
        <LayoutInnerStyles {...rest}>
            <>
                <h3 className="title">
                    {isMobile ? (
                        <TextReveal
                            className="title__chars"
                            text={title}
                            animate={animate}
                        />
                    ) : (
                        <m.span
                            animate={animate}
                            transition={{ ...easing.expoFast, delay: 0.1 }}
                            variants={translateVariants}
                            className="title__chars"
                        >
                            {title}
                        </m.span>
                    )}
                </h3>

                {htmlString ? (
                    <m.div
                        ref={ref}
                        animate={animate}
                        dangerouslySetInnerHTML={{ __html: htmlString }}
                        transition={{ ...easing.expoFast, delay: 0.22 }}
                        variants={animateContent && translateVariants}
                        className="inner-content"
                    />
                ) : (
                    <m.div
                        ref={ref}
                        animate={animate}
                        transition={{ ...easing.expoFast, delay: 0.22 }}
                        variants={animateContent && translateVariants}
                        className="inner-content"
                    >
                        {children}
                    </m.div>
                )}
            </>
        </LayoutInnerStyles>
    );
};

const LayoutInnerStyles = styled.div`
    display: flex;
    align-items: flex-start;

    @media (max-width: ${SIZE.mobile}px) {
        flex-direction: column;
        width: 100%;
    }

    .title {
        cursor: pointer;
        width: fit-content;
        flex: 0 0 ${LAYOUT_OFFSET}%;
        margin-top: 1rem;

        &__chars {
            font-size: 1.6rem;
            font-family: "graphik-semi";
            letter-spacing: 0.1em;
            text-transform: uppercase;
            display: inline-flex;

            @media (max-width: ${SIZE.mobile}px) {
                font-family: "noe-medium";
                margin-bottom: 1rem;
                letter-spacing: -0.03em;
                text-transform: none;
                font-size: 5rem;
            }
        }
    }

    .inner-content {
        flex: 1;
        width: 100%;
        transform-origin: top right;
    }
`;

export default LayoutInner;
