import styled from "styled-components";
import { AnimatePresence, motion as m } from "framer-motion";

//tree
import { SIZE } from "../../constant/mesure";
import useCursorAction from "../../hooks/useCursorAction";
import { useEffect, useState } from "react";

const LayoutFooter = ({ ...rest }) => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const { cursorEnter, cursorOut } = useCursorAction("zoom");
    const {
        cursorEnter: cursorEnterMail,
        cursorOut: cursorOutMail,
    } = useCursorAction("magnetic");
    useEffect(() => {
        const checkIfIsAtBottom = () => {
            const { innerHeight, pageYOffset } = window;
            const { offsetHeight } = document.body;

            setIsAtBottom(innerHeight + pageYOffset >= offsetHeight);
        };

        window.addEventListener("scroll", checkIfIsAtBottom);
        return () => window.removeEventListener("scroll", checkIfIsAtBottom);
    }, []);
    return (
        <LayoutBottomStyles {...rest}>
            <small className="copyright">jeremie nallet &copy; 2021</small>

            <div className="right-container">
                <AnimatePresence>
                    {isAtBottom && (
                        <m.a
                            onMouseOver={cursorEnterMail}
                            onMouseOut={cursorOutMail}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="email"
                            href="mailto:jeremienallet@gmail.com"
                        >
                            jeremienallet@gmail.com
                        </m.a>
                    )}
                </AnimatePresence>

                <m.svg
                    className="gh-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.912"
                    height="24.297"
                    onMouseOver={cursorEnter}
                    onMouseLeave={cursorOut}
                >
                    <path d="M12.455 0a12.458 12.458 0 00-3.937 24.276c.623.114.85-.27.85-.6 0-.3-.011-1.079-.017-2.119-3.465.753-4.2-1.669-4.2-1.669a3.3 3.3 0 00-1.383-1.822c-1.131-.773.086-.757.086-.757a2.615 2.615 0 011.908 1.283 2.652 2.652 0 003.625 1.035 2.663 2.663 0 01.791-1.665c-2.766-.314-5.674-1.383-5.674-6.156a4.815 4.815 0 011.282-3.342 4.475 4.475 0 01.122-3.3s1.045-.335 3.425 1.277a11.812 11.812 0 016.237 0c2.378-1.612 3.422-1.277 3.422-1.277a4.476 4.476 0 01.125 3.3 4.807 4.807 0 011.28 3.342c0 4.785-2.913 5.838-5.688 6.146a2.974 2.974 0 01.846 2.307c0 1.665-.015 3.009-.015 3.417 0 .333.225.72.856.6A12.458 12.458 0 0012.45.002z" />
                </m.svg>
            </div>
        </LayoutBottomStyles>
    );
};
const LayoutBottomStyles = styled(m.footer)`
    position: fixed;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 5;
    left: 0;
    width: 100vw;
    bottom: 2.5rem;
    padding: 0 2rem 0 2.4rem;
    @media (max-width: ${SIZE.mobile}px) {
        bottom: 1.2rem;
        padding: 0 1.2rem 0 2.4rem;
    }

    .right-container {
        display: flex;
        align-items: center;
        .email {
            pointer-events: initial;
            font-size: 1.3rem;

            margin-right: 3rem;
            &:hover {
                text-decoration: underline;
            }

            @media (max-width: ${SIZE.mediumDesktop}px) {
                margin-right: 18.2rem;
            }

            @media (max-width: ${SIZE.smallDesktop}px) {
                margin-right: 3rem;
            }
            @media (max-width: ${SIZE.mobile}px) {
                margin-right: 1rem;
            }
        }
        .gh-logo {
            pointer-events: initial;
            fill: ${({ theme }) => theme.colorSecondary};
            cursor: pointer;
            @media (max-width: ${SIZE.mobile}px) {
                transform: scale(0.9);
            }
        }
    }

    .copyright {
        pointer-events: initial;
        transform-origin: left;
        text-transform: uppercase;
        transform: rotate(90deg) translate(-100%, -30%);
        display: flex;
        align-items: center;
        font-size: 1rem;
        opacity: 0.7;
        justify-content: center;
        @media (max-width: ${SIZE.mobile}px) {
            opacity: 0;
        }
    }
`;

export default LayoutFooter;
