import { useCallback, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion as m,
    useAnimation,
    useViewportScroll,
} from "framer-motion";
import styled from "styled-components";

//tree
import * as easing from "../../../lib/easing";
import { LAYOUT_OFFSET, SIZE } from "../../constant/mesure";
import { useStore } from "../../../lib/store";
import Switch from "../misc/Switch";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";
import MiddleLine from "../misc/MiddleLine";
import ThemeTransition from "../misc/ThemeTransition";
import SideIndicator from "../misc/SideIndicator";

const Layout = ({ children, initialLinePos = "67%" }) => {
    const loader = useStore((state) => state.loader);
    const [hasScrolled, setHasScrollled] = useState(false);
    const sideIndicator = useStore((state) => state.sideIndicator);
    const setSideIndicator = useStore((state) => state.setSideIndicator);
    const { scrollYProgress } = useViewportScroll();
    const scrollControl = useAnimation();
    const controls = useAnimation();
    const containerRef = useRef();

    const middleLinePosition = useCallback(() => {
        scrollControl.start(`${hasScrolled ? "scrolling" : "notSrolling"}`);
    }, [hasScrolled, scrollControl]);

    useEffect(() => {
        controls.start(`${loader.reveal ? "visible" : "hidden"}`);
    }, [controls, loader.reveal]);

    useEffect(() => {
        middleLinePosition();
        window.addEventListener("resize", middleLinePosition);
        return () => window.removeEventListener("resize", middleLinePosition);
    }, [middleLinePosition]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const onScrolll = ({ target }) => {
                if (target.documentElement.scrollTop === 0) {
                    setSideIndicator({ title: "", progress: 0 });
                }
                setHasScrollled(target.documentElement.scrollTop !== 0);
            };
            window.addEventListener("scroll", onScrolll);
            return () => window.removeEventListener("scroll", onScrolll);
        }
    }, [setSideIndicator]);

    const middleLineVariants = {
        notSrolling: { left: "67%" },
        scrolling: { left: `${LAYOUT_OFFSET}%` },
    };

    const openingVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { ...easing.expoSlow, delay: 0.7, duration: 3 },
        },
    };

    return (
        <LayoutStyles ref={containerRef}>
            <LayoutHeader variants={openingVariants} animate={controls} />
            <LayoutFooter variants={openingVariants} animate={controls} />
            <main className="main-content">
                {children}
                <MiddleLine
                    style={{ left: initialLinePos }}
                    variants={middleLineVariants}
                    animate={scrollControl}
                    transition={{ ...easing.expoFast, duration: 0.8 }}
                />

                <Switch variants={openingVariants} animate={controls} />
            </main>

            <AnimatePresence>
                {sideIndicator.title && hasScrolled && <SideIndicator />}
            </AnimatePresence>
            <m.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />
        </LayoutStyles>
    );
};

export default Layout;

const LayoutStyles = styled.div`
    margin: 0 6rem;
    border-left: 0.1rem solid ${({ theme }) => theme.colorLine};
    border-right: 0.1rem solid ${({ theme }) => theme.colorLine};
    position: relative;

    @media (max-width: ${SIZE.mobile}px) {
        margin: 0 1.5rem;
        border: none;
    }

    .main-content {
        overflow-x: hidden;
        width: 67%;
        min-height: inherit;
        margin: auto;
        position: relative;
        border-right: 0.1rem solid ${({ theme }) => theme.colorLine};
        border-left: 0.1rem solid ${({ theme }) => theme.colorLine};
        padding-bottom: 3rem;

        @media (max-width: ${SIZE.mediumDesktop}px) {
            width: 75%;
        }
        @media (max-width: ${SIZE.smallDesktop}px) {
            width: 100%;
            border: none;
        }
        @media (max-width: ${SIZE.mobile}px) {
            padding-bottom: 1.2rem;
        }
    }
    .scroll-bar {
        transform-origin: left;
        font-size: 1rem;
        z-index: 999;
        height: 0.7rem;
        width: 100%;
        background: ${({ theme }) => theme.colorHighlight};
        will-change: transform;

        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
        @media (max-width: ${SIZE.smallMobile}px) {
            height: 0.4rem;
        }
    }
`;
