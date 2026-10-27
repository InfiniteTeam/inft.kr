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
  // 메뉴를 연 경로를 기억해 두면, 페이지가 바뀌는 순간 자연스럽게 닫힙니다.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenedAt(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={clsx(styles.header, open && styles.open)}>
      <nav className={styles.pill} aria-label="주 메뉴">
        <Link
          href="/"
          className={styles.home}
          aria-label={`${site.name} 홈`}
          onClick={close}
        >
          <LogoMark size={18} />
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
                    <ArrowUpRight size={12} className={styles.away} />
                    <span className="visually-hidden"> (새 창)</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <a
          className={styles.discord}
          href={site.links.discord}
          target="_blank"
          rel="noreferrer"
          aria-label="디스코드 서버 (새 창)"
        >
          <DiscordIcon size={17} />
        </a>

        {/* 두 줄(=)이 가운데로 모였다가 돌아 X가 됩니다. */}
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
          {[{ href: '/', label: '홈' }, ...navigation].map((item) => {
            const external = 'external' in item && item.external;
            return (
              <li key={item.href}>
                {external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ArrowUpRight size={20} className={styles.away} />
                    <span className="visually-hidden"> (새 창)</span>
                  </a>
                ) : (
                  <Link href={item.href} onClick={close}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <a href={site.links.discord} target="_blank" rel="noreferrer">
              디스코드 서버
              <ArrowUpRight size={20} className={styles.away} />
              <span className="visually-hidden"> (새 창)</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
