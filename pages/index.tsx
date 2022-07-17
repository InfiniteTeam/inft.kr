import type { NextPage } from "next";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <Layout page="홈" className={styles.page}>
            <div className={styles.hero}>무한한 미래를 만들어갑니다</div>
        </Layout>
    );
};

export default Home;
