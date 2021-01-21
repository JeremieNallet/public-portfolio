import fs from "fs";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

//tree
import Layout from "../components/layout/Layout";
import Landing from "../components/landing/Landing";
import Project from "../components/project/Project";
import Contact from "../components/contact/Contact";
import Cursor from "../components/misc/Cursor";
import Skills from "../components/skills/Skills";
import Loader from "../components/loader/Loader";
import Snake from "../components/snake/Snake";

import ThemeTransition from "../components/misc/ThemeTransition";
import useScrollStatus from "../hooks/useScrollStatus";
import { useStore } from "../../lib/store";
import { scale, title } from "../../content/config/head";

const Home = ({ projects, extra }) => {
    const loader = useStore((state) => state.loader);
    const isGameShowing = useStore((state) => state.isGameShowing);
    const isMusicPlaying = useStore((state) => state.isMusicPlaying);
    useScrollStatus(`${loader.scrollReady ? "unset" : "hidden"}`);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content={scale} />
            </Head>
            <Cursor />
            <Loader />
            <ThemeTransition />
            <Layout>
                <Landing />
                <Project projects={projects} extra={extra} />
                <Skills />
                <Contact />
            </Layout>
            <AnimatePresence>{isGameShowing && <Snake />}</AnimatePresence>
            {isMusicPlaying && <div className="noise" />}
        </>
    );
};

export const getStaticProps = async () => {
    const getFiles = (path) => {
        return fs.readdirSync(path).map((file) => {
            return fs.readFileSync(`${path}/${file}`, "utf8");
        });
    };
    const projects = getFiles(`${process.cwd()}/content/projects`);
    const extra = getFiles(`${process.cwd()}/content/extra`);

    return { props: { projects, extra } };
};

export default Home;
