import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import styles from './Button.module.scss';

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'light' | 'ghost';
  size?: 'md' | 'lg';
  /** 기본값: 외부 링크면 ↗, 내부 링크면 → */
  icon?: 'arrow' | 'external' | 'none' | React.ReactNode;
  download?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  download,
  className,
}: Props) {
  const external = /^https?:\/\//.test(href);
  const kind = icon ?? (external ? 'external' : 'arrow');
  const glyph =
    kind === 'arrow' ? (
      <ArrowRight size={15} className={styles.arrow} />
    ) : kind === 'external' ? (
      <ArrowUpRight size={14} className={styles.external} />
    ) : kind === 'none' ? null : (
      kind
    );

  const classes = clsx(styles.button, styles[variant], styles[size], className);

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noreferrer' })}
        {...(download && { download: true })}
      >
        {children}
        {glyph}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {glyph}
    </Link>
  );
}
