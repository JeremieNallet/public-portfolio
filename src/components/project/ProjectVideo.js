import { motion as m } from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";
import useReveal from "../../hooks/useReveal";
import useCursorAction from "../../hooks/useCursorAction";
import { SIZE } from "../../constant/mesure";

const Link = ({ link, title }) => {
    const { cursorEnter, cursorOut } = useCursorAction("magnetic");
    return (
        <a
            onMouseOver={cursorEnter}
            onMouseOut={cursorOut}
            className="links"
            href={link}
            rel="noreferrer"
            target="_blank"
        >
            {title}
        </a>
    );
};

const ProjectVideo = ({ video, repo, live }) => {
    const { ref, animate } = useReveal(0);
    const { cursorEnter, cursorOut } = useCursorAction("shrink");

    const revealVariants = {
        hidden: { scaleX: 1, skewX: 0 },
        visible: { scaleX: 0, skewX: 20 },
    };

    return (
        <>
            <ProjectVideoStyled ref={ref}>
                <div className="video-content">
                    <m.div
                        variants={revealVariants}
                        animate={animate}
                        transition={{ ...easing.expoFast }}
                        className="video-content__reveal-layer"
                    />
                    <video
                        loop
                        autoPlay
                        muted
                        playsInline
                        preload={"auto"}
                        onMouseOver={cursorEnter}
                        onMouseOut={cursorOut}
                        className="video-content__video"
                        alt="video"
                        src={video}
                        onClick={() => {
                            window.open(live, "_blank");
                        }}
                    />
                </div>
                <div className="links-container">
                    {repo && <Link title="Github repo" link={repo} />}
                    {live && <Link title="Live version" link={live} />}
                </div>
            </ProjectVideoStyled>
        </>
    );
};

const ProjectVideoStyled = styled(m.div)`
    .video-content {
        position: relative;
        z-index: 9;
        overflow: hidden;
        border: 1rem solid ${({ theme }) => theme.colorLightBackground};

        @media (max-width: ${SIZE.smallMobile}px) {
            width: 100vw;
            margin: -1.5rem 0 0 -1.5rem;
            border: none;
        }

        &__video {
            width: 100%;
            transform: scale(1.02);
            height: auto;
            cursor: pointer;
        }
        &__reveal-layer {
            width: 100%;
            height: 100.5%;
            transform-origin: bottom left;
            background: ${({ theme }) => theme.colorLightBackground};
            position: absolute;
            top: 0;
            z-index: 9;
            @media (max-width: ${SIZE.smallMobile}px) {
                background: ${({ theme }) => theme.colorBackground};
            }
        }
    }
    .links-container {
        @media (max-width: ${SIZE.smallMobile}px) {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            white-space: nowrap;
            width: 100%;
        }
    }
    .links {
        font-size: 1.3rem;
        display: inline-flex;
        text-decoration: underline;
        margin: 1rem 0.5rem 0 0.5rem;
        :hover {
            text-decoration: none;
        }
    }
`;

export default ProjectVideo;
