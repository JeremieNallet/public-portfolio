import { motion as m } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";

//tree
import TextReveal from "../components/misc/TextReveal";
import BigButton from "../components/misc/BigButton";
import * as easing from "../../lib/easing";
import { SIZE } from "../constant/mesure";

const Success = () => {
    const router = useRouter();

    return (
        <PageStyle>
            <div className="big-text">
                <TextReveal
                    initial="hidden"
                    animate="visible"
                    text="Thank you !"
                />
            </div>
            <m.small
                transition={{ ...easing.expoFast, delay: 1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="small-text"
            >
                Awesome, your message was successfully sent !
            </m.small>
            <m.div
                transition={{ ...easing.expoFast, delay: 1.1 }}
                initial={{ opacity: 0, scaleX: 0, y: 70 }}
                animate={{ opacity: 1, scaleX: 1, y: 0 }}
            >
                <BigButton onClick={() => router.push("/")} text="Go back" />
            </m.div>
        </PageStyle>
    );
};

const PageStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    padding-bottom: 10rem;
    @media (max-width: ${SIZE.smallMobile}px) {
        padding-bottom: 0rem;
    }
    .big-text {
        font-size: 9rem;
        font-family: "noe-medium";
        @media (max-width: ${SIZE.smallMobile}px) {
            font-size: 15.5vw;
        }
    }
    .small-text {
        font-family: "graphik-regular";
        font-size: 1.6rem;
        margin-bottom: 4rem;
        @media (max-width: ${SIZE.smallMobile}px) {
            font-size: 1.5rem;
            margin: 0rem 2rem 2rem 2rem;
            text-align: center;
            line-height: 1.5em;
        }
    }
`;

export default Success;
