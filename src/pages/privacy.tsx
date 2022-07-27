import type { NextPage } from 'next';
import Layout from 'components/Layout';
import ReactMarkdown from 'react-markdown';
import content from 'docs/privacy.md';
import styles from 'styles/pages/Privacy.module.scss';
import stylesMarkdown from 'styles/Markdown.module.scss';

const Tos: NextPage = () => {
  return (
    <Layout page="개인정보처리방침">
      <div className={styles.section}>
        <span className={styles.title}>
          <span>개인정보 처리방침</span>
          <small>PRIVACY POLICY</small>
        </span>
      </div>

      <div className="mt-5">
        <ReactMarkdown className={stylesMarkdown.markdown}>
          {content}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default Tos;
