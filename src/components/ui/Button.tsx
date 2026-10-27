import Link from 'next/link';
import clsx from 'clsx';
import { ArrowUpRight } from '@/components/icons';
import styles from './Button.module.scss';

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  icon,
  className,
}: Props) {
  const external = /^https?:\/\//.test(href);
  const classes = clsx(styles.button, styles[variant], className);
  const content = (
    <>
      {icon}
      {children}
      {external && (
        <>
          <ArrowUpRight size={16} className={styles.away} />
          <span className="visually-hidden"> (새 창)</span>
        </>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
