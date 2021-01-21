import { createContext, useRef } from "react";
import { useStore } from "../../lib/store";

export const AudioContext = createContext();

export function AudioContextProvider({ children }) {
    const audioRef = useRef(null);
    const toggleMusic = useStore((state) => state.toggleMusic);
    const isMusicPlaying = useStore((state) => state.isMusicPlaying);

    const playAudio = () => {
        if (!isMusicPlaying) {
            toggleMusic();
            audioRef.current.play();
            audioRef.current.volume = "0.05";
        } else {
            toggleMusic();
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <AudioContext.Provider value={{ audioRef, playAudio }}>
            {children}
        </AudioContext.Provider>
    );
}
