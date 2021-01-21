import styled from "styled-components";
import matter from "gray-matter";
import marked from "marked";

//tree
import ProjectHead from "./ProjectHead";
import ProjectVideo from "./ProjectVideo";
import ProjectExtra from "./ProjectExtra";
import SectionTitle from "../misc/SectionTitle";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useStore } from "../../../lib/store";

/**
 * @param {Array<string>} projects
 * UNPARSED .md data
 * @param {Array<string>} extra
 * UNPARSED .md data
 */
const Project = ({ projects, extra }) => {
    const setSideIndicator = useStore((state) => state.setSideIndicator);

    const { ref: sectionRef, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setSideIndicator({ title: "01 - PROJECTS", progress: 0 });
        }
    }, [inView, setSideIndicator]);

    return (
        <section style={{ marginBottom: "30vh" }} ref={sectionRef}>
            <SectionTitle text="projects." number="01" />
            {projects.map((item, i) => {
                const { data, content } = matter(item);
                const description = marked(content);
                return (
                    <ProjectContent className="project-content" key={i}>
                        <ProjectHead {...data} description={description} />
                        <ProjectVideo {...data} />
                    </ProjectContent>
                );
            })}
            <ProjectExtra extra={extra} />
        </section>
    );
};

const ProjectContent = styled.div`
    position: relative;
    z-index: 2;
    margin-bottom: 15rem;
    p {
        margin-bottom: 3rem;
    }
`;

export default Project;
