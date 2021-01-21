import styled from "styled-components";
import Link from "next/link";
import { motion as m } from "framer-motion";

//tree
import { SIZE } from "../../constant/mesure";
import useCursorAction from "../../hooks/useCursorAction";
import AudioBtn from "../misc/AudioBtn";

const LayoutHeader = ({ ...rest }) => {
    const { cursorEnter, cursorOut } = useCursorAction("zoom");
    return (
        <LayoutHeaderStyles {...rest}>
            <Link href="/">
                <m.a
                    onMouseOver={cursorEnter}
                    onMouseLeave={cursorOut}
                    className="logo"
                >
                    JN
                </m.a>
            </Link>

            <AudioBtn onMouseOver={cursorEnter} onMouseLeave={cursorOut} />
        </LayoutHeaderStyles>
    );
};

const LayoutHeaderStyles = styled(m.header)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    z-index: 5;
    padding: 1.3rem 1.2rem 0 2rem;
    left: 0;
    width: 100%;

    @media (max-width: ${SIZE.mobile}px) {
        padding: 1rem 0.5rem 0 1.5rem;
    }

    > * {
        pointer-events: initial;
    }
    .logo {
        pointer-events: initial;
        font-family: "noe-regular";
        font-size: 2.5rem;
        cursor: pointer;
    }
`;

export default LayoutHeader;
