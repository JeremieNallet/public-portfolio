import create from "zustand";

const initialState = {
    theme: "light",
    isGameShowing: false,
    isMusicPlaying: false,
    gameScore: 0,

    sideIndicator: {
        progress: 0,
        title: "",
    },

    loader: {
        reveal: false,
        complete: false,
        readyScroll: false,
    },

    cursor: {
        alpha: false,
        hoverBinding: { x: null, y: null },
        loaderBinding: { x: null, y: null },
        gameFoodBinding: { x: null, y: null },
        size: 0.8,
        fill: true,
        active: true,
    },

    themeTransition: {
        active: false,
        nextTheme: undefined,
    },
};

export const useStore = create((set) => ({
    ...initialState,

    setTheme: (theme) => {
        set({ theme });
    },

    toggleGame: () => {
        set(({ isGameShowing }) => ({ isGameShowing: !isGameShowing }));
    },

    incGameScore: () => {
        set(({ gameScore }) => ({ gameScore: gameScore + 1 }));
    },
    resetGameScore: () => {
        set({ gameScore: 0 });
    },

    toggleMusic: () => {
        set(({ isMusicPlaying }) => ({ isMusicPlaying: !isMusicPlaying }));
    },

    setLoader: (value) => {
        set(({ loader }) => ({ loader: { ...loader, ...value } }));
    },

    setCursor: (value) => {
        set(({ cursor }) => ({ cursor: { ...cursor, ...value } }));
    },

    setThemeTransition: (value) => {
        set(({ themeTransition }) => ({
            themeTransition: { ...themeTransition, ...value },
        }));
    },

    setSideIndicator: (value) => {
        set(({ sideIndicator }) => ({
            sideIndicator: { ...sideIndicator, ...value },
        }));
    },
}));
