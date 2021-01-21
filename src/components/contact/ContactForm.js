import styled from "styled-components";
import { useContext } from "react";
import { motion as m } from "framer-motion";

//tree
import { SIZE } from "../../constant/mesure";
import LayoutInner from "../layout/LayoutInner";
import ContactInput from "./ContactInput";
import useReveal from "../../hooks/useReveal";
import BigArrow from "../misc/BigArrow";
import BigButton from "../misc/BigButton";
import { useStore } from "../../../lib/store";
import * as easing from "../../../lib/easing";
import { AudioContext } from "../../context/audioContext";

const ContactForm = () => {
    const { playAudio } = useContext(AudioContext);
    const { ref, animate, inView } = useReveal(0.4);
    const toggleGame = useStore((state) => state.toggleGame);
    const isMusicPlaying = useStore((state) => state.isMusicPlaying);

    const startGame = (e) => {
        //since the button is in the form it prevents a submit action.
        e.preventDefault();
        e.stopPropagation();

        toggleGame();
        if (!isMusicPlaying) playAudio();
        return false;
    };

    const formVariantsContainer = {
        visible: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.5,
                when: "afterChildren",
            },
        },
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            rotate: 100,
            x: 100,
        },
        visible: (i) => ({
            opacity: 1,
            rotate: 0,
            x: 0,
            transition: { ...easing.expoFast, duration: 2, delay: i * 0.09 },
        }),
    };

    return (
        <LayoutInner animateContent={false} title="Contact">
            <FormStyles
                action="/success"
                name="contactForm"
                method="POST"
                data-netlify="true"
                ref={ref}
                animate={animate}
                variants={formVariantsContainer}
            >
                <input type="hidden" name="form-name" value="contactForm" />
                <ContactInput
                    name="email"
                    type="email"
                    placeholder="Address mail :"
                />
                <ContactInput
                    name="name"
                    type="text"
                    placeholder="Your name :"
                />
                <ContactInput
                    name="message"
                    placeholder="Your message :"
                    textarea
                />
                <div className="submit">
                    <m.div
                        className="submit__btn-container"
                        custom={0}
                        variants={buttonVariants}
                        animate={animate}
                    >
                        <BigButton
                            onClick={startGame}
                            color="primary"
                            text="Play a game ?"
                        />
                    </m.div>

                    <m.div
                        className="submit__btn-container"
                        custom={1}
                        variants={buttonVariants}
                        animate={animate}
                    >
                        <BigButton text="Send message" />
                    </m.div>
                </div>
            </FormStyles>
            {inView && <BigArrow />}
        </LayoutInner>
    );
};

const FormStyles = styled(m.form)`
    @media (max-width: ${SIZE.mobile}px) {
        margin-top: 4rem;
    }

    .submit {
        display: flex;
        justify-content: flex-end;
        height: 100%;
        margin-top: 6rem;
        &__btn-container {
            margin: 0.5rem;
        }
        @media (max-width: ${SIZE.mobile}px) {
            margin: 7rem 0rem 2rem 0;
            justify-content: center;
        }
    }
`;

export default ContactForm;
