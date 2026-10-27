import Link from 'next/link';
import { site } from '@/data/site';
import projects from '@/data/projects';
import {
  ArrowUpRight,
  DiscordIcon,
  GitHubIcon,
  LogoMark,
} from '@/components/icons';
import styles from './Footer.module.scss';

const columns = [
  {
    title: 'Infinite Studio',
    links: [
      { href: '/about', label: '소개' },
      { href: '/projects', label: '프로젝트' },
      { href: '/brand', label: '브랜드' },
    ],
  },
  {
    title: '서비스',
    links: [
      ...projects
        .filter((project) => project.url)
        .map((project) => ({ href: project.url!, label: project.name })),
      { href: site.links.status, label: '서비스 상태' },
    ],
  },
  {
    title: '함께하기',
    links: [
      { href: site.links.careers, label: '채용' },
      { href: site.links.discord, label: '디스코드 서버' },
      { href: site.links.github, label: 'GitHub' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.sign}>
            <LogoMark size={28} />
            <p>
              무한한 미래를
              <br />
              만들어 갑니다
            </p>
          </div>

          <div className={styles.columns}>
            {columns.map((column) => (
              <div key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => {
                    const external = link.href.startsWith('http');
                    return (
                      <li key={link.href}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                            <ArrowUpRight size={11} />
                          </a>
                        ) : (
                          <Link href={link.href}>{link.label}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            <span>
              © {site.founded.year}–{year} {site.name}
            </span>
            <Link href="/privacy">개인정보 처리방침</Link>
          </p>
          <div className={styles.social}>
            <a
              href={site.links.discord}
              target="_blank"
              rel="noreferrer"
              aria-label="디스코드"
            >
              <DiscordIcon size={17} />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
