import { motion as m, AnimatePresence } from "framer-motion";
import marked from "marked";
import { useState } from "react";
import styled from "styled-components";
import matter from "gray-matter";
import FeatherIcon from "feather-icons-react";

//tree
import LayoutInner from "../layout/LayoutInner";
import * as easing from "../../../lib/easing";
import useCursorAction from "../../hooks/useCursorAction";
import useReveal from "../../hooks/useReveal";
import { SIZE } from "../../constant/mesure";
import { isMobile } from "react-device-detect";

const Link = ({ link, title }) => {
    const { cursorEnter, cursorOut } = useCursorAction("magnetic");
    return (
        <a
            target="_blank"
            rel="noreferrer"
            onMouseOver={cursorEnter}
            onMouseOut={cursorOut}
            className="link"
            href={link}
        >
            {title}
        </a>
    );
};

const ProjectExtra = ({ extra }) => {
    const { ref, animate } = useReveal(0.5);
    const { data: preOpenedProject } = matter(extra[0]);
    const [openedBlock, setOpenedBlock] = useState(preOpenedProject.title);
    const [hoveredBlock, setHoveredBlock] = useState(preOpenedProject.title);

    const { cursorEnter, cursorOut } = useCursorAction(
        `${!isMobile ? "surround" : "shrink"}`
    );

    const openAccordion = (key) => {
        setOpenedBlock((state) => (state === key ? "" : key));
    };

    const innerPartVariants = {
        initial: { y: 0, opacity: 0, height: 0 },
        animate: { y: 0, opacity: 1, height: "auto" },
        exit: { y: -20, opacity: 0, height: 0 },
    };

    const listVariantsParent = {
        visible: {
            transition: { staggerChildren: 0.06 },
        },
    };
    const listVariants = {
        hidden: { opacity: 0, y: 100, rotate: 2 },
        visible: { opacity: 1, y: 0, rotate: 0 },
    };

    return (
        <LayoutInner animateContent={false} title="More projects">
            <m.ul ref={ref} variants={listVariantsParent} animate={animate}>
                {extra.map((item) => {
                    const { data: project, content } = matter(item);
                    const description = marked(content);

                    const isOpen = openedBlock === project.title;
                    const isHovered = hoveredBlock === project.title;
                    const transition = { ...easing.cubic };

                    const animateButton = {
                        scale: isHovered ? 0.9 : isOpen ? 1 : 1,
                        rotate: isOpen ? 180 : isHovered ? 90 : 0,
                        opacity: isOpen ? 1 : isHovered ? 1 : 0.3,
                    };

                    return (
                        <ListItem
                            variants={listVariants}
                            isOpen={isOpen}
                            onClick={() => openAccordion(project.title)}
                            onHoverStart={() => setHoveredBlock(project.title)}
                            onHoverEnd={() => setHoveredBlock("")}
                            key={project.title}
                            transition={easing.expoFast}
                        >
                            <div className="visible-part">
                                <h4 className="visible-part__title">
                                    {project.title}
                                </h4>

                                <m.button
                                    aria-label="see-more-button"
                                    onMouseOver={cursorEnter}
                                    onMouseOut={cursorOut}
                                    animate={animateButton}
                                    transition={transition}
                                    className="visible-part__btn"
                                >
                                    <FeatherIcon
                                        size={19}
                                        color="white"
                                        icon={`${isOpen ? "minus" : "plus"}`}
                                    />
                                </m.button>
                            </div>
                            <AnimatePresence>
                                {isOpen && (
                                    <>
                                        <m.div
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={innerPartVariants}
                                            transition={transition}
                                            className="md-content"
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                        <m.div
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={innerPartVariants}
                                            transition={transition}
                                        >
                                            {project.repo && (
                                                <Link
                                                    link={project.repo}
                                                    title="Github repo"
                                                />
                                            )}
                                            {project.live && (
                                                <Link
                                                    link={project.live}
                                                    title="Live versio"
                                                />
                                            )}
                                        </m.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </ListItem>
                    );
                })}
            </m.ul>
        </LayoutInner>
    );
};

const ListItem = styled(m.li)`
    width: 100%;
    height: 100%;
    padding: 1rem 0.9rem;
    cursor: pointer;
    transform-origin: left;
    background: ${({ isOpen, theme }) => isOpen && theme.colorLightBackground};
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid ${({ theme }) => theme.colorLine};

    &:hover {
        filter: brightness(99%);
        background: ${({ theme }) => theme.colorLightBackground};
    }

    .visible-part {
        cursor: pointer;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__title {
            display: inline-flex;
            font-size: 1.5rem;

            font-family: ${({ isOpen }) =>
                !isOpen ? "graphik-regular" : "graphik-semi"};
        }
        &__btn {
            border-radius: 20rem;
            height: 3.5rem;
            width: 3.5rem;
            border: none;
            background: ${({ theme }) => theme.colorHighlight};
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9;
            position: relative;
            cursor: pointer;
        }
    }
    .md-content {
        > p {
            margin-right: 3rem;
        }
    }
    .link {
        display: inline-flex;
        justify-self: flex-end;
        margin-right: 1.5rem;
        margin-top: 0.8rem;
        margin-bottom: 1rem;
        margin: 0.8rem 1.4rem 1rem 0;
        font-size: 1.4rem;
        text-decoration: underline;
        color: ${({ theme }) => theme.colorHighlight};
        &:hover {
            text-decoration: none;
        }
    }

    @media (max-width: ${SIZE.mobile}px) {
        top: 3rem;
    }
`;

export default ProjectExtra;
