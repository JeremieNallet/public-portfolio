import { motion as m } from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";

const TextReveal = ({ text, animate, ...rest }) => {
    // translate3d(150px,50px,-400px) scaleY(.01) rotateX(-90deg) rotate(-35deg)
    const lettersVariants = {
        hidden: {
            x: 90,
            y: 50,
            z: 400,
            rotateX: -90,
            rotate: -35,
            scaleY: 0,
            opacity: 0,
        },
        visible: (i) => ({
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotate: 0,
            scaleY: 1,
            opacity: 1,
            transition: {
                delay: i * 0.02,
                ...easing.expoFast,
            },
        }),
    };

    return (
        <>
            {text.split("").map((item, i) => {
                return (
                    <TextEffectStyle
                        key={i}
                        custom={i}
                        animate={animate}
                        style={{
                            display: item !== " " ? "inline-block" : "inline",
                        }}
                        variants={lettersVariants}
                        {...rest}
                    >
                        {item}
                    </TextEffectStyle>
                );
            })}
        </>
    );
};

const TextEffectStyle = styled(m.span)`
    transform-origin: left;
`;

export default TextReveal;
