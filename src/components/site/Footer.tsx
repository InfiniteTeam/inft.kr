import Link from 'next/link';
import { footerLinks, site } from '@/data/site';
import { ArrowUpRight, LogoMark } from '@/components/icons';
import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.closing}>
          <LogoMark size={28} className={styles.mark} />
          {site.slogan}
        </p>

        <div className={styles.rows}>
          <ul className={styles.links} aria-label="사이트">
            {footerLinks.inside.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.links} aria-label="바깥 링크">
            {footerLinks.outside.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ArrowUpRight size={14} />
                  <span className="visually-hidden"> (새 창)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.legal}>
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
