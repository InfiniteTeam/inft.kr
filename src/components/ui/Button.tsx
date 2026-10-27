import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  download?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  icon,
  download,
  className,
}: Props) {
  const external = /^https?:\/\//.test(href);
  const classes = clsx(styles.button, styles[variant], className);
  const content = (
    <>
      {icon}
      {children}
      {external && <span className="visually-hidden"> (새 창)</span>}
    </>
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noreferrer' })}
        {...(download && { download: true })}
      >
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
