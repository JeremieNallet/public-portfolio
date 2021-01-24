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
import SnakeLayout from "../components/snake/SnakeLayout";
import { useContext } from "react";
import { AudioContext } from "../context/audioContext";

const Home = ({ projects, extra }) => {
    const loader = useStore((state) => state.loader);
    const isGameShowing = useStore((state) => state.isGameShowing);
    const isMusicPlaying = useStore((state) => state.isMusicPlaying);

    const { audioRef } = useContext(AudioContext);
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
            <AnimatePresence>
                {isGameShowing && <SnakeLayout />}
            </AnimatePresence>
            {isMusicPlaying && <div className="noise" />}
            <audio
                loop
                ref={audioRef}
                type="audio/mp3"
                src="/audio/music.mp3"
            />
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
