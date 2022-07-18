import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
        </AnimatePresence>
    );
}
