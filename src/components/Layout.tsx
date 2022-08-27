import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styles from 'styles/components/Layout.module.scss';
import Link from 'next/link';
import Button from './Button';
import { SiDiscord, SiGithub } from 'react-icons/si';
import { TbMenu2 } from 'react-icons/tb';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

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
  const title = (page ? `${page} - ` : '') + 'Infinite Studio';

  const [pathname, setPathname] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const menuBar = (
    <>
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
      <Link href="/brand" passHref>
        <a>
          <Button active={pathname === '/brand'}>브랜드</Button>
        </a>
      </Link>
      <a href="https://status.inft.kr" target="_blank" rel="noreferrer">
        <Button>서비스 상태</Button>
      </a>
      <a href="https://employment.inft.kr" target="_blank" rel="noreferrer">
        <Button>채용</Button>
      </a>
    </>
  );

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.header}>
        <Link href="/">
          <a>
            <div className={styles.brand}>
              <Image
                className={styles.logo}
                alt=""
                src="/logo.svg"
                height={27}
                width={27}
              />
              <div>인피니트팀</div>
            </div>
          </a>
        </Link>

        <div className="hidden sm:flex gap-2">{menuBar}</div>

        <div
          className="sm:hidden p-2 -mr-2"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <TbMenu2 size={28} />
        </div>
      </nav>

      <div
        className={`fixed -mx-2 bg-[#1b1e2b]/75 w-full z-[9999] backdrop-blur-[5px] top-16 transition-all duration-300 sm:hidden gap-2.5 flex flex-col ${
          showMenu ? '' : 'opacity-0 pointer-events-none'
        }`}
      >
        {menuBar}
      </div>

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
            © 2022 Infinite Studio. All Rights Reserved.
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
