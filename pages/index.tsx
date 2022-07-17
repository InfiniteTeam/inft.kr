import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>홈 - InfiniteTeam</title>
                <meta name="description" content="무한한 미래를 만들어갑니다 - SINCE 2018" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>Main</main>
            <footer className={styles.footer}>Footer</footer>
        </div>
    );
};

export default Home;
