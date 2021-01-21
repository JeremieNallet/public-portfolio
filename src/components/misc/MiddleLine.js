import styled from "styled-components";
import { motion as m } from "framer-motion";

//tree
import useResponsive from "../../hooks/useResponsive";

const MiddleLine = ({ ...rest }) => {
    const isMobile = useResponsive();

    return (
        <>
            {!isMobile && (
                <MiddleLineStyles {...rest}>
                    <div className="middle-line" />
                </MiddleLineStyles>
            )}
        </>
    );
};

const MiddleLineStyles = styled(m.div)`
    width: 0.1rem;
    height: 100vh;
    z-index: 1;
    will-change: left;
    position: absolute;
    z-index: 1;
    top: 0;
    pointer-events: none;
    .middle-line {
        background-color: ${({ theme }) => theme.colorLine};
        width: 0.1rem;
        height: 100%;

        will-change: left;
        position: fixed;
        top: 0;
    }
`;

export default MiddleLine;
