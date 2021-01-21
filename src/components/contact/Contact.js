import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

//tree
import { useStore } from "../../../lib/store";
import ContactAbout from "./ContactAbout";
import ContactForm from "./ContactForm";
import SectionTitle from "../misc/SectionTitle";
const Contact = () => {
    const { ref, inView } = useInView();
    const setSideIndicator = useStore((state) => state.setSideIndicator);

    useEffect(() => {
        if (inView) {
            setSideIndicator({ title: "03 - CONTACT", progress: 100 });
        } else {
            //if we scroll back up.
            setSideIndicator({ title: "02 - SKILLS", progress: 50 });
        }
    }, [inView, setSideIndicator]);

    return (
        <section style={{ marginBottom: "9rem" }} ref={ref}>
            <SectionTitle number="03" text="Contact" />
            <ContactAbout />
            <ContactForm />
        </section>
    );
};

export default Contact;
