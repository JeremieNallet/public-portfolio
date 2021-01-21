import "../styles/font.css";
import { useEffect } from "react";
import { GlobalStyle } from "../styles";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { useStore } from "../../lib/store";
import { AudioContextProvider } from "../context/audioContext";

function MyApp({ Component, pageProps }) {
    const theme = useStore((state) => state.theme);

    useEffect(() => {
        // ! just a UX preference ... totaly unnecessary
        const forceScrollUpOnRefresh = (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        };

        window.addEventListener("beforeunload", (e) => {
            forceScrollUpOnRefresh(e);
        });
        return () => {
            window.removeEventListener("beforeunload", (e) => {
                forceScrollUpOnRefresh(e);
            });
        };
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />
            <AudioContextProvider>
                <Component {...pageProps} />
            </AudioContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
