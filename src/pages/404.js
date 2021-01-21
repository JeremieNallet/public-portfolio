import { useEffect } from "react";
import { motion as m } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

//tree
import TextReveal from "../components/misc/TextReveal";
import BigButton from "../components/misc/BigButton";
import Layout from "../components/layout/Layout";
import * as easing from "../../lib/easing";
import { useStore } from "../../lib/store";

const Success = () => {
    const router = useRouter();
    const setLoader = useStore((state) => state.setLoader);
    useEffect(() => {
        setLoader({ reveal: true, complete: true });
    }, [setLoader]);
    return (
        <Layout initialLinePos="50%">
            <NotFoundPage>
                <div className="text--fx">
                    <TextReveal
                        initial="hidden"
                        animate="visible"
                        text="404 Page not found."
                    />
                </div>
                <m.small
                    transition={{ ...easing.expoFast, duration: 2.3 }}
                    initial={{ opacity: 0, y: 10, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    className="text--small"
                >
                    There is nothing here.
                </m.small>
                <m.div
                    transition={easing.expoFast}
                    initial={{ opacity: 0, scaleX: 0, y: 120 }}
                    animate={{ opacity: 1, scaleX: 1, y: 0 }}
                >
                    <BigButton
                        onClick={() => router.push("/")}
                        text="Find my way"
                    />
                </m.div>
            </NotFoundPage>
        </Layout>
    );
};

const NotFoundPage = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 3.5rem);
    .text {
        &--fx {
            font-size: 7.5rem;
            font-family: "noe-medium";
        }
        &--small {
            font-family: "graphik-regular";
            font-size: 1.6rem;
            margin-top: 0.8rem;
            margin-bottom: 4rem;
        }
    }
`;

export default Success;
