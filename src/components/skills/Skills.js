import styled from "styled-components";
import { motion as m } from "framer-motion";

//tree
import LayoutInner from "../layout/LayoutInner";
import * as easing from "../../../lib/easing";
import siteContent from "../../../content/config/site";
import useReveal from "../../hooks/useReveal";
import SectionTitle from "../misc/SectionTitle";
import { SIZE } from "../../constant/mesure";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useStore } from "../../../lib/store";

const Skills = () => {
    const { ref, animate } = useReveal(0.5);
    const { ref: sectionRef, inView } = useInView();
    const setSideIndicator = useStore((state) => state.setSideIndicator);
    const sideIndicator = useStore((state) => state.sideIndicator);

    useEffect(() => {
        //it prevents the title from switching when the observer leave the viewport.
        if (sideIndicator.title !== "03 - CONTACT") {
            if (inView) {
                setSideIndicator({ title: "02 - SKILLS", progress: 50 });
            } else {
                //if we sccroll back up
                setSideIndicator({ title: "01 - PROJECTS", progress: 0 });
            }
        }
    }, [inView, sideIndicator.title, setSideIndicator]);

    const variantsContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 },
        },
    };
    const skillLevelVariants = {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1 },
    };
    const listVariants = {
        hidden: { opacity: 0, y: 100, rotate: 2 },
        visible: { opacity: 1, y: 0, rotate: 0 },
    };

    return (
        <section style={{ marginBottom: "30vh" }} ref={sectionRef}>
            <SectionTitle number="02" text="Skills." />
            <LayoutInner title="Development">
                <SkillStyles
                    ref={ref}
                    animate={animate}
                    variants={variantsContainer}
                >
                    {siteContent.skills.map(({ title, percentage }) => (
                        <m.li
                            variants={listVariants}
                            transition={easing.expoFast}
                            key={title}
                            className="list-item"
                        >
                            <span
                                transition={easing.expoFast}
                                className="title"
                            >
                                {title}
                            </span>
                            <span className="level">
                                <m.span
                                    style={{ width: percentage }}
                                    variants={skillLevelVariants}
                                    transition={{ ...easing.expoFast }}
                                    className="level--inner"
                                />
                            </span>
                        </m.li>
                    ))}
                </SkillStyles>
                <HelperText>Always learning somehting new !</HelperText>
            </LayoutInner>
        </section>
    );
};

const SkillStyles = styled(m.ul)`
    .list-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;
        overflow: hidden;

        @media (max-width: ${SIZE.smallMobile}px) {
            flex-direction: column;
            margin-bottom: 1rem;
        }

        .title {
            flex: 1;
            display: flex;
            transform-origin: left;
            @media (max-width: ${SIZE.smallMobile}px) {
                font-size: 1.45rem;
                width: 100%;
            }
        }
        .level {
            flex: 0 0 calc(50% + 1rem);
            display: block;
            position: relative;
            width: 100%;
            height: 1.3rem;

            border: 0.1rem solid ${({ theme }) => theme.primaryColor};
            @media (max-width: ${SIZE.smallMobile}px) {
                flex: 0 0 0.6rem;
                border: none;
                background: ${({ theme }) => theme.colorLightBackground};
            }

            &--inner {
                position: absolute;
                width: 60%;
                height: 100%;
                display: block;
                transform-origin: left;
                background: ${({ theme }) => theme.colorHighlight};
                border-radius: 0.15rem;
            }
        }
    }
`;
const HelperText = styled.span`
    margin-top: 5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-end;
    font-size: 1.4rem;
    opacity: 0.5;
    text-decoration: underline;

    @media (max-width: ${SIZE.smallMobile}px) {
        justify-content: center;
    }
`;
export default Skills;
