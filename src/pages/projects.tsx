import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/Projects.module.scss';
import members from 'data/members';
import Image from 'next/image';

const Projects: NextPage = () => {
  return (
    <Layout page="프로젝트">
      <div className={styles.section}>
        <span className={styles.title}>
          <span>프로젝트 리스트</span>
          <small>PROJECTS</small>
        </span>
      </div>
    </Layout>
  );
};

export default Projects;
