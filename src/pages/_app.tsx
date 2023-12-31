import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Playfair_Display } from "next/font/google";
import Head from "next/head";
import { Container } from "react-bootstrap";
import styles from "@/styles/app.module.css";
import NavBar from "../../components/NavBar";
import { secondaryColor } from "@/styles/colors";
import NextNProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={playfair.className}>
      <Head>
        <title key="title">News Fetch</title>
        <meta
          name="description"
          key="description"
          content="Fetching news from the world wide web"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress color={secondaryColor} />
      <NavBar />
      <Container className={styles.pageContainer}>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
