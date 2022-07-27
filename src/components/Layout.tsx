import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styles from 'styles/components/Layout.module.scss';
import Link from 'next/link';
import Button from './Button';
import { SiDiscord, SiGithub } from 'react-icons/si';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const variants = {
  hidden: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

interface Props {
  page?: string;
  className?: string;
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ page, className, children }) => {
  const title = (page ? `${page} - ` : '') + 'InfiniteTeam';

  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a>
            <div className={styles.brand}>
              <img className={styles.logo} alt="" src="/logo.svg" />
              <div>인피니트팀</div>
            </div>
          </a>
        </Link>

        <div className={styles.menus}>
          <Link href="/about" passHref>
            <a>
              <Button active={pathname === '/about'}>소개</Button>
            </a>
          </Link>
          <Link href="/projects" passHref>
            <a>
              <Button active={pathname === '/projects'}>프로젝트</Button>
            </a>
          </Link>
          <a href="https://status.inft.kr" target="_blank" rel="noreferrer">
            <Button>서비스 상태</Button>
          </a>
          <a href="https://employment.inft.kr" target="_blank" rel="noreferrer">
            <Button>채용</Button>
          </a>
        </div>
      </header>
      <div className="h-[64px]" />
      <motion.main
        className={clsx(styles.main, className)}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 100,
          delay: 0.3,
        }}
      >
        {children}
      </motion.main>
      <footer className={styles.footer}>
        <div className={styles.legal}>
          <span className={styles.copyright}>
            © 2022 InfiniteTeam. All Rights Reserved.
          </span>
          <div className={styles.policy}>
            <Link href="/privacy">
              <a>개인정보 처리방침</a>
            </Link>
          </div>
        </div>
        <div className={styles.social}>
          <a href="https://discord.gg/7aFczQk" target="_blank" rel="noreferrer">
            <SiDiscord></SiDiscord>
          </a>
          <a
            href="https://github.com/InfiniteTeam"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub></SiGithub>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
