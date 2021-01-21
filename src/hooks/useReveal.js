import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useReveal = (threshold = 0) => {
    const { ref, inView } = useInView({ threshold, triggerOnce: true });
    const animate = useAnimation();

    useEffect(() => {
        animate.start(`${inView ? "visible" : "hidden"}`);
    }, [animate, inView]);

    return { ref, animate, inView };
};

export default useReveal;
