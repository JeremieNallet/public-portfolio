import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    memo,
    useContext,
} from "react";
import { gsap } from "gsap";
import { motion as m } from "framer-motion";
import { AudioContext } from "../../context/audioContext";
//tree
import { pixelRatio } from "../../utils/pixelRatio";
import { useStore } from "../../../lib/store";

// => Assets

const AudioBtn = ({ className, variants, ...rest }) => {
    const { playAudio, audioRef } = useContext(AudioContext);
    const theme = useStore((state) => state.theme);
    const isMusicPlaying = useStore((state) => state.isMusicPlaying);
    const canvasRef = useRef(null);
    const requestID = useRef(null);

    const options = useMemo(
        () => ({
            active: 0,
            height: 0.1,
            volume: 0,
            length: 4.5,
            speed: 0.08,
        }),
        []
    );
    const getStyle = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const mesures = {
            ratio: pixelRatio(ctx),
            width: getComputedStyle(canvas)
                .getPropertyValue("width")
                .slice(0, -2),
            height: getComputedStyle(canvas)
                .getPropertyValue("height")
                .slice(0, -2),
        };
        canvas.width = mesures.width * mesures.ratio;
        canvas.height = mesures.height * mesures.ratio;
        canvas.style.width = `${mesures.width}px`;
        canvas.style.height = `${mesures.width}px`;
    }, []);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.scale(1, 1);
            options.active += 1;
            for (let i = 0; i < 60; i += 1) {
                if (i < 60 / 2) {
                    options.height += 0.1;
                } else {
                    options.height += -0.1;
                }
                const sin =
                    Math.sin(
                        options.active * options.speed + i / options.length
                    ) *
                    options.volume *
                    options.height;

                ctx.lineTo((canvas.width / 75) * i, 30 + sin);
            }
            ctx.strokeStyle = theme === "light" ? "black" : "white";
            ctx.lineWidth = 2.2;
            ctx.stroke();
            requestID.current = requestAnimationFrame(render);
        }
    }, [options, theme]);

    const triggerSoundWave = useCallback(() => {
        gsap.to(options, { volume: `${isMusicPlaying ? 6 : 2}` });
    }, [isMusicPlaying, options]);

    useEffect(() => {
        triggerSoundWave();
    }, [triggerSoundWave]);

    useEffect(() => {
        getStyle();
        render();
        return () => {
            cancelAnimationFrame(requestID.current);
        };
    }, [getStyle, render]);

    return (
        <m.button
            onClick={playAudio}
            variants={variants}
            aria-label="audio-button"
            className={className}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
            }}
            {...rest}
        >
            <audio
                loop
                ref={audioRef}
                type="audio/mp3"
                src="/audio/music.mp3"
            />
            <canvas ref={canvasRef} width={30} height={30} />
        </m.button>
    );
};

export default memo(AudioBtn);
