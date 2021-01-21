//tree
import LayoutInner from "../layout/LayoutInner";

const About = () => {
    return (
        <LayoutInner style={{ marginBottom: "10rem" }} title="About">
            <p style={{ marginBottom: "2rem" }}>
                I&apos;m Jérémie ! A front-end developer and React.js enthusiast
                with a big taste for typography and interactive design. Around
                mid 2019 I was introduced to computer science and I immediately
                fell in love with it.
            </p>
            <p>
                Self-taught, I used various online documentation and resources,
                to learn all the skill needed to become a front-end developer. I
                love what I do, feel free to drop me a line I will be very happy
                to hear from you.{" "}
                <span className="highlighted-text">
                    I&apos;m currently looking for a full time position as a
                    front-end developer.
                </span>
            </p>
        </LayoutInner>
    );
};

export default About;
