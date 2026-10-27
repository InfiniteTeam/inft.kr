'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { navigation, site } from '@/data/site';
import { ArrowUpRight, DiscordIcon, LogoMark } from '@/components/icons';
import styles from './Nav.module.scss';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // 메뉴를 연 경로를 기억해 두면, 페이지가 바뀌는 순간 자연스럽게 닫힙니다.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenedAt(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        styles.header,
        scrolled && styles.scrolled,
        open && styles.open
      )}
    >
      <nav className={clsx('container', styles.bar)} aria-label="주 메뉴">
        <Link href="/" className={styles.brand} aria-label={`${site.name} 홈`}>
          <LogoMark size={19} />
          <span>{site.name}</span>
        </Link>

        <ul className={styles.links}>
          {navigation.map((item) => {
            const external = 'external' in item && item.external;
            const active = !external && pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                {external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ArrowUpRight size={12} className={styles.ext} />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(active && styles.active)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <a
          className={styles.cta}
          href={site.links.discord}
          target="_blank"
          rel="noreferrer"
        >
          <DiscordIcon size={15} />
          커뮤니티
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpenedAt(open ? null : pathname)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="mobile-menu" className={styles.sheet} inert={!open}>
        <ul className="container">
          {[{ href: '/', label: '홈' }, ...navigation].map((item, i) => {
            const external = 'external' in item && item.external;
            return (
              <li key={item.href} style={{ transitionDelay: `${i * 35}ms` }}>
                {external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <Link href={item.href} onClick={close}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li style={{ transitionDelay: `${(navigation.length + 1) * 35}ms` }}>
            <a href={site.links.discord} target="_blank" rel="noreferrer">
              디스코드 커뮤니티
              <ArrowUpRight size={18} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
