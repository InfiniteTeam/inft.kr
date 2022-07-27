import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout page="홈" className={styles.page}>
      <div>
        <div className="text-3xl sm:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
          무한한 미래를 만들어갑니다
        </div>
        <div className="text-lg sm:text-xl font-light pt-5 text-gray-400">
          InfiniteTeam - 디스코드 봇 개발팀
        </div>
      </div>
    </Layout>
  );
};

export default Home;
